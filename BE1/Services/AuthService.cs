using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using BE1.DTOs.Auth;
using BE1.Models;
using BE1.Repositories.Interfaces;
using BE1.Services.Interface;
using BE1.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.IdentityModel.Tokens;

namespace BE1.Services
{
    public class AuthService : IAuthService
    {
        private readonly IUserRepository         _userRepo;
        private readonly IRefreshTokenRepository _refreshRepo;
        private readonly string _jwtSecret;
        private readonly string _jwtRefreshSecret;

        // Access token: 15 phút | Refresh token: 7 ngày
        private const int AccessTokenMinutes  = 15;
        private const int RefreshTokenDays    = 7;

        public AuthService(IUserRepository userRepo, IRefreshTokenRepository refreshRepo)
        {
            _userRepo         = userRepo;
            _refreshRepo      = refreshRepo;
            _jwtSecret        = Environment.GetEnvironmentVariable("JWT_SECRET")
                ?? throw new InvalidOperationException("JWT_SECRET is missing in .env");
            _jwtRefreshSecret = Environment.GetEnvironmentVariable("JWT_REFRESH_SECRET")
                ?? throw new InvalidOperationException("JWT_REFRESH_SECRET is missing in .env");
        }

        // ─── REGISTER ─────────────────────────────────────────────────

        public async Task<LoginResponse> RegisterAsync(RegisterRequest request, HttpContext httpContext)
        {
            if (await _userRepo.IsUsernameExistAsync(request.Username))
                throw new Exception("Username already exists");

            if (await _userRepo.IsEmailExistAsync(request.Email))
                throw new Exception("Email already exists");

            var user = new User
            {
                Username       = request.Username,
                Email          = request.Email,
                PasswordHash   = BCrypt.Net.BCrypt.HashPassword(request.Password),
                Name           = request.Name ?? request.Username,
                Bio            = "",
                Avatar         = request.Avatar ?? "",
                Location       = "",
                Role           = "user",
                FollowersCount = 0,
                FollowingCount = 0,
                IsBanned       = false,
                CreatedAt      = DateTime.UtcNow,
                UpdatedAt      = DateTime.UtcNow
            };

            var created = await _userRepo.CreateAsync(user);
            return await BuildLoginResponseAsync(created, httpContext);
        }

        // ─── LOGIN ────────────────────────────────────────────────────

        public async Task<LoginResponse> LoginAsync(LoginRequest request, HttpContext httpContext)
        {
            if (string.IsNullOrWhiteSpace(request.UsernameOrEmail))
                throw new Exception("Username or email is required");

            if (string.IsNullOrWhiteSpace(request.Password))
                throw new Exception("Password is required");

            // Tìm user theo email hoặc username
            var user = request.UsernameOrEmail.Contains('@')
                ? await _userRepo.GetByEmailAsync(request.UsernameOrEmail)
                : await _userRepo.GetByUsernameAsync(request.UsernameOrEmail);

            if (user == null)
                throw new Exception("Invalid username/email or password");

            // Kiểm tra bị ban
            if (user.IsBanned == true)
                throw new Exception("Your account has been banned");

            // User đăng nhập qua Google — không có password
            if (string.IsNullOrWhiteSpace(user.PasswordHash))
                throw new Exception("This account uses Google sign-in. Please login with Google.");

            // Kiểm tra hash hợp lệ ($2a$ hoặc $2b$ đều OK với BCrypt.Net)
            if (!user.PasswordHash.StartsWith("$2"))
                throw new Exception("Account error: please contact support");

            if (!BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
                throw new Exception("Invalid username/email or password");

            // Dọn token hết hạn trước khi tạo mới
            await _refreshRepo.DeleteExpiredByUserIdAsync(user.Id);

            return await BuildLoginResponseAsync(user, httpContext);
        }

        // ─── REFRESH TOKEN ────────────────────────────────────────────

        public async Task<TokenResponse> RefreshTokenAsync(string rawRefreshToken, HttpContext httpContext)
        {
            if (string.IsNullOrWhiteSpace(rawRefreshToken))
                throw new Exception("Refresh token is required");

            // Decode token lấy userId
            var userId = ExtractUserIdFromRawToken(rawRefreshToken);
            if (userId == null)
                throw new Exception("Invalid refresh token");

            // Tìm token hợp lệ trong DB
            var storedToken = await _refreshRepo.GetValidByUserIdAsync(userId);
            if (storedToken == null)
                throw new Exception("Refresh token not found or expired. Please login again.");

            // Verify hash
            if (!BCrypt.Net.BCrypt.Verify(rawRefreshToken, storedToken.TokenHash))
                throw new Exception("Refresh token mismatch. Please login again.");

            // Lấy user
            var user = await _userRepo.GetByIdAsync(userId);
            if (user == null)
                throw new Exception("User not found");

            if (user.IsBanned == true)
                throw new Exception("Your account has been banned");

            // Rotate: xóa token cũ, tạo token mới
            await _refreshRepo.DeleteByUserIdAsync(userId);

            var newAccessToken  = GenerateAccessToken(user);
            var newRawRefresh   = GenerateRawToken();
            var newRefreshHash  = BCrypt.Net.BCrypt.HashPassword(newRawRefresh);

            await _refreshRepo.CreateAsync(new RefreshToken
            {
                UserId     = user.Id,
                TokenHash  = newRefreshHash,
                DeviceInfo = httpContext.Request.Headers["User-Agent"].ToString(),
                IpAddress  = httpContext.Connection.RemoteIpAddress?.ToString(),
                ExpiresAt  = DateTime.UtcNow.AddDays(RefreshTokenDays),
                CreatedAt  = DateTime.UtcNow,
                UpdatedAt  = DateTime.UtcNow
            });

            // Ghi cookie mới
            SetRefreshTokenCookie(httpContext, newRawRefresh);

            return new TokenResponse
            {
                AccessToken  = newAccessToken,
                RefreshToken = newRawRefresh
            };
        }

        // ─── LOGOUT ───────────────────────────────────────────────────

        public async Task LogoutAsync(string userId)
        {
            await _refreshRepo.DeleteByUserIdAsync(userId);
        }

        // ─── PRIVATE HELPERS ──────────────────────────────────────────

        private async Task<LoginResponse> BuildLoginResponseAsync(User user, HttpContext httpContext)
        {
            var accessToken = GenerateAccessToken(user);
            var rawRefresh  = GenerateRawToken();
            var refreshHash = BCrypt.Net.BCrypt.HashPassword(rawRefresh);

            await _refreshRepo.CreateAsync(new RefreshToken
            {
                UserId     = user.Id,
                TokenHash  = refreshHash,
                DeviceInfo = httpContext.Request.Headers["User-Agent"].ToString(),
                IpAddress  = httpContext.Connection.RemoteIpAddress?.ToString(),
                ExpiresAt  = DateTime.UtcNow.AddDays(RefreshTokenDays),
                CreatedAt  = DateTime.UtcNow,
                UpdatedAt  = DateTime.UtcNow
            });

            SetRefreshTokenCookie(httpContext, rawRefresh);

            return new LoginResponse
            {
                User         = MapToUserResponse(user),
                AccessToken  = accessToken,
                RefreshToken = rawRefresh
            };
        }

        private string GenerateAccessToken(User user)
        {
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id),
                new Claim(ClaimTypes.Name,           user.Username),
                new Claim(ClaimTypes.Email,          user.Email),
                new Claim(ClaimTypes.Role,           user.Role)
            };

            var key   = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSecret));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                claims:             claims,
                expires:            DateTime.UtcNow.AddMinutes(AccessTokenMinutes),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        // Raw token ngẫu nhiên 32 bytes — hash bằng BCrypt trước khi lưu DB
        private static string GenerateRawToken()
            => Convert.ToHexString(RandomNumberGenerator.GetBytes(32)).ToLower();

        // Decode raw token (hex string) để lấy userId
        // Cách: tìm storedToken theo tất cả token của user gần nhất
        // — Vì raw token không phải JWT nên ta dùng userId được encode thêm vào chuỗi
        private string? ExtractUserIdFromRawToken(string rawToken)
        {
            // Format: {userId}:{randomHex}
            var parts = rawToken.Split(':');
            if (parts.Length == 2) return parts[0];

            // Fallback: không tìm được userId từ token
            // Trong trường hợp này cần scan DB — bỏ qua để tránh tấn công timing
            return null;
        }

        private static void SetRefreshTokenCookie(HttpContext httpContext, string rawToken)
        {
            httpContext.Response.Cookies.Append("refresh_token", rawToken, new CookieOptions
            {
                HttpOnly = true,
                Secure   = false,        // đổi thành true khi production (HTTPS)
                SameSite = SameSiteMode.Strict,
                Expires  = DateTime.UtcNow.AddDays(RefreshTokenDays)
            });
        }

        internal static UserResponse MapToUserResponse(User user) => new()
        {
            Id             = user.Id,
            Username       = user.Username,
            Email          = user.Email,
            Name           = user.Name,
            Bio            = user.Bio,
            Avatar         = user.Avatar,
            Location       = user.Location,
            Role           = user.Role,
            FollowersCount = user.FollowersCount,
            FollowingCount = user.FollowingCount,
            IsBanned       = user.IsBanned ?? false,
            CreatedAt      = user.CreatedAt
        };
    }
}