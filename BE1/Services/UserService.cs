using BE1.DTOs;
using BE1.DTOs.Auth;
using BE1.Models;
using BE1.Repositories.Interfaces;
using BE1.Services.Interfaces;
using MongoDB.Bson;

namespace BE1.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<UserResponse> RegisterAsync(RegisterRequest request)
        {
            // Kiểm tra username và email đã tồn tại chưa
            if (await _userRepository.IsUsernameExistAsync(request.Username))
                throw new Exception("Username already exists");

            if (await _userRepository.IsEmailExistAsync(request.Email))
                throw new Exception("Email already exists");

            // Hash password (sẽ cải tiến sau khi thêm BCrypt)
            var passwordHash = BCrypt.Net.BCrypt.HashPassword(request.Password);

            var user = new User
            {
                Username = request.Username,
                Email = request.Email,
                PasswordHash = passwordHash,
                Name = request.Name,
                Bio = request.Bio,
                Avatar = request.Avatar,
                Location = request.Location,
                CreatedAt = DateTime.UtcNow
            };

            var createdUser = await _userRepository.CreateAsync(user);

            return new UserResponse
            {
                Id = createdUser.Id,
                Username = createdUser.Username,
                Email = createdUser.Email,
                Name = createdUser.Name,
                Bio = createdUser.Bio,
                Avatar = createdUser.Avatar,
                Location = createdUser.Location,
                Role = createdUser.Role,
                FollowersCount = createdUser.FollowersCount,
                FollowingCount = createdUser.FollowingCount,
                CreatedAt = createdUser.CreatedAt
            };
        }

        public async Task<LoginResponse> LoginAsync(LoginRequest request)
        {

            // Tìm user theo username hoặc email
>
            User? user = null;

            if (request.UsernameOrEmail.Contains("@"))
                user = await _userRepository.GetByEmailAsync(request.UsernameOrEmail);
            else
                user = await _userRepository.GetByUsernameAsync(request.UsernameOrEmail);


            if (user == null || !BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
                throw new Exception("Invalid username/email or password");

            var userResponse = new UserResponse
            {   

                Id = user.Id,
                Username = user.Username,
                Email = user.Email,
                Name = user.Name,
                Bio = user.Bio,
                Avatar = user.Avatar,
                Location = user.Location,
                Role = user.Role,
                FollowersCount = user.FollowersCount,
                FollowingCount = user.FollowingCount,
                CreatedAt = user.CreatedAt
            };

            // Token sẽ xử lý sau khi thêm JWT
            return new LoginResponse
            {
                User = userResponse,
                Token = "fake-jwt-token-for-now"  // ← Sẽ thay bằng JWT thật sau
            };
        }

        public async Task<UserResponse?> GetByIdAsync(string id)
        {
            var user = await _userRepository.GetByIdAsync(id);
            if (user == null) return null;

            return new UserResponse
            {
                Id = user.Id,
                Username = user.Username,
                Email = user.Email,
                Name = user.Name,
                Bio = user.Bio,
                Avatar = user.Avatar,
                Location = user.Location,
                Role = user.Role,
                FollowersCount = user.FollowersCount,
                FollowingCount = user.FollowingCount,
                CreatedAt = user.CreatedAt
            };
        }

        public async Task<UserResponse?> GetByUsernameAsync(string username)
        {
            var user = await _userRepository.GetByUsernameAsync(username);
            if (user == null) return null;

            return new UserResponse
            {
                Id = user.Id,
                Username = user.Username,
                Email = user.Email,
                Name = user.Name,
                Bio = user.Bio,
                Avatar = user.Avatar,
                Location = user.Location,
                Role = user.Role,
                FollowersCount = user.FollowersCount,
                FollowingCount = user.FollowingCount,
                CreatedAt = user.CreatedAt
            };
        }

        public async Task<bool> UpdateAsync(string id, User user)
        {
            await _userRepository.UpdateAsync(id, user);
            return true;
        }
    }
}