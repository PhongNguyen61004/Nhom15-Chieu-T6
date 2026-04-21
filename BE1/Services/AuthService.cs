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
        private readonly string                  _jwtSecret;
        private readonly string                  _jwtRefreshSecret;
        private readonly ILogger<AuthService>    _logger;

        private const int AccessTokenMinutes = 15;
        private const int RefreshTokenDays   = 7;

        public AuthService(
            IUserRepository userRepo,
            IRefreshTokenRepository refreshRepo,
            ILogger<AuthService> logger)
        {
            _userRepo         = userRepo;
            _refreshRepo      = refreshRepo;
            _logger           = logger;
            _jwtSecret        = Environment.GetEnvironmentVariable("JWT_SECRET")
                ?? throw new InvalidOperationException("JWT_SECRET is missing in .env");
            _jwtRefreshSecret = Environment.GetEnvironmentVariable("JWT_REFRESH_SECRET")
                ?? throw new InvalidOperationException("JWT_REFRESH_SECRET is missing in .env");
        }

        // ─── REGISTER ─────────────────────────────────────────────────

        public async Task<LoginResponse> RegisterAsync(RegisterRequest request, HttpContext httpContext)
        {
            LogRequestInfo(httpContext, "REGISTER");

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

            _logger.LogInformation("[REGISTER] ✅ Success | UserId: {UserId} | Username: {Username} | Email: {Email}",
                created.Id, created.Username, created.Email);

            return await BuildLoginResponseAsync(created, httpContext);
        }

        // ─── LOGIN ────────────────────────────────────────────────────

        public async Task<LoginResponse> LoginAsync(LoginRequest request, HttpContext httpContext)
        {
            LogRequestInfo(httpContext, "LOGIN");

            _logger.LogInformation("[LOGIN] Attempt | UsernameOrEmail: {UsernameOrEmail}",
                request.UsernameOrEmail);

            if (string.IsNullOrWhiteSpace(request.UsernameOrEmail))
                throw new Exception("Username or email is required");

            if (string.IsNullOrWhiteSpace(request.Password))
                throw new Exception("Password is required");

            var user = request.UsernameOrEmail.Contains('@')
                ? await _userRepo.GetByEmailAsync(request.UsernameOrEmail)
                : await _userRepo.GetByUsernameAsync(request.UsernameOrEmail);

            if (user == null)
            {
                _logger.LogWarning("[LOGIN] ❌ User not found | Input: {Input}", request.UsernameOrEmail);
                throw new Exception("Invalid username/email or password");
            }

            if (user.IsBanned == true)
            {
                _logger.LogWarning("[LOGIN] ❌ Banned | UserId: {UserId}", user.Id);
                throw new Exception("Your account has been banned");
            }

            if (string.IsNullOrWhiteSpace(user.PasswordHash))
                throw new Exception("This account uses Google sign-in. Please login with Google.");

            if (!user.PasswordHash.StartsWith("$2"))
                throw new Exception("Account error: please contact support");

            if (!BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
            {
                _logger.LogWarning("[LOGIN] ❌ Wrong password | UserId: {UserId}", user.Id);
                throw new Exception("Invalid username/email or password");
            }

            await _refreshRepo.DeleteExpiredByUserIdAsync(user.Id);

            _logger.LogInformation("[LOGIN] ✅ Success | UserId: {UserId} | Username: {Username}",
                user.Id, user.Username);

            return await BuildLoginResponseAsync(user, httpContext);
        }

        // ─── REFRESH TOKEN ────────────────────────────────────────────

        public async Task<TokenResponse> RefreshTokenAsync(string rawRefreshToken, HttpContext httpContext)
        {
            LogRequestInfo(httpContext, "REFRESH");

            _logger.LogInformation("[REFRESH] Token (first 10 chars): {TokenPreview}",
                rawRefreshToken[..Math.Min(10, rawRefreshToken.Length)]);

            if (string.IsNullOrWhiteSpace(rawRefreshToken))
                throw new Exception("Refresh token is required");

            var userId = ExtractUserIdFromRawToken(rawRefreshToken);
            _logger.LogInformation("[REFRESH] Extracted UserId: {UserId}", userId ?? "null");

            if (userId == null)
                throw new Exception("Invalid refresh token");

            var storedToken = await _refreshRepo.GetValidByUserIdAsync(userId);
            if (storedToken == null)
            {
                _logger.LogWarning("[REFRESH] ❌ No valid token in DB | UserId: {UserId}", userId);
                throw new Exception("Refresh token not found or expired. Please login again.");
            }

            if (!BCrypt.Net.BCrypt.Verify(rawRefreshToken, storedToken.TokenHash))
            {
                _logger.LogWarning("[REFRESH] ❌ Token hash mismatch | UserId: {UserId}", userId);
                throw new Exception("Refresh token mismatch. Please login again.");
            }

            var user = await _userRepo.GetByIdAsync(userId);
            if (user == null)
                throw new Exception("User not found");

            if (user.IsBanned == true)
                throw new Exception("Your account has been banned");

            await _refreshRepo.DeleteByUserIdAsync(userId);

            var newAccessToken = GenerateAccessToken(user);
            var newRawRefresh  = GenerateRawToken();
            var newRefreshHash = BCrypt.Net.BCrypt.HashPassword(newRawRefresh);

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

            SetRefreshTokenCookie(httpContext, newRawRefresh);

            _logger.LogInformation("[REFRESH] ✅ Success | UserId: {UserId}", user.Id);

            return new TokenResponse
            {
                AccessToken  = newAccessToken,
                RefreshToken = newRawRefresh
            };
        }

        // ─── LOGOUT ───────────────────────────────────────────────────

        public async Task LogoutAsync(string userId)
        {
            _logger.LogInformation("[LOGOUT] UserId: {UserId}", userId);
            await _refreshRepo.DeleteByUserIdAsync(userId);
            _logger.LogInformation("[LOGOUT] ✅ Success | UserId: {UserId}", userId);
        }

        // ─── PRIVATE HELPERS ──────────────────────────────────────────

        private void LogRequestInfo(HttpContext httpContext, string action)
        {
            var headers = httpContext.Request.Headers;

            _logger.LogInformation(
                "[{Action}] ─── Incoming Request ───────────────────────\n" +
                "  IP            : {IP}\n" +
                "  Method        : {Method}\n" +
                "  Path          : {Path}\n" +
                "  Authorization : {Auth}\n" +
                "  User-Agent    : {UA}\n" +
                "  Origin        : {Origin}\n" +
                "  Referer       : {Referer}\n" +
                "  Cookie        : {Cookie}\n" +
                "────────────────────────────────────────────────────",
                action,
                httpContext.Connection.RemoteIpAddress?.ToString() ?? "unknown",
                httpContext.Request.Method,
                httpContext.Request.Path,
                headers.ContainsKey("Authorization")
                    ? "Bearer " + (headers["Authorization"].ToString().Replace("Bearer ", "")[..Math.Min(20, headers["Authorization"].ToString().Length - 7)]) + "..."
                    : "none",
                headers["User-Agent"].ToString(),
                headers["Origin"].ToString(),
                headers["Referer"].ToString(),
                headers.ContainsKey("Cookie") ? "[present]" : "none"
            );
        }

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

            _logger.LogInformation(
                "[BUILD_RESPONSE] AccessToken (first 20): {Preview} | RefreshToken (first 10): {RTPreview}",
                accessToken[..Math.Min(20, accessToken.Length)],
                rawRefresh[..Math.Min(10, rawRefresh.Length)]
            );

            return new LoginResponse
            {
                User         = MapToUserResponse(user),
                AccessToken  = accessToken,
                RefreshToken = rawRefresh
            };
        }

        private string GenerateAccessToken(User user)
        {
            var now = DateTime.UtcNow;

            var claims = new[]
            {
                new Claim("user_id", user.Id),
                new Claim("email",   user.Email),
                new Claim("iat",     new DateTimeOffset(now).ToUnixTimeSeconds().ToString(), ClaimValueTypes.Integer64),
            };

            var key   = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSecret));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                claims:             claims,
                expires:            now.AddMinutes(AccessTokenMinutes),
                signingCredentials: creds
            );

            var tokenString = new JwtSecurityTokenHandler().WriteToken(token);

            _logger.LogInformation(
                "[TOKEN] Generated | UserId: {UserId} | Email: {Email} | Expires: {Exp}",
                user.Id, user.Email, now.AddMinutes(AccessTokenMinutes).ToString("o")
            );

            return tokenString;
        }

        private static string GenerateRawToken()
            => Convert.ToHexString(RandomNumberGenerator.GetBytes(32)).ToLower();

        private string? ExtractUserIdFromRawToken(string rawToken)
        {
            var parts = rawToken.Split(':');
            if (parts.Length == 2) return parts[0];
            return null;
        }

        private static void SetRefreshTokenCookie(HttpContext httpContext, string rawToken)
        {
            httpContext.Response.Cookies.Append("refresh_token", rawToken, new CookieOptions
            {
                HttpOnly = true,
                Secure   = false,
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