using BE1.DTOs.Auth;
using BE1.Models;
using BE1.Repositories.Interfaces;
using BE1.Services.Interfaces;

namespace BE1.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepo;

        public UserService(IUserRepository userRepo)
        {
            _userRepo = userRepo;
        }




        public async Task<UserResponse?> GetByIdAsync(string id)
        {
            var user = await _userRepo.GetByIdAsync(id);
            return user == null ? null : AuthService.MapToUserResponse(user);
        }

        public async Task<UserResponse?> GetByUsernameAsync(string username)
        {
            var user = await _userRepo.GetByUsernameAsync(username);
            return user == null ? null : AuthService.MapToUserResponse(user);
        }

        // ─── PROFILE ──────────────────────────────────────────────────

        public async Task<UserResponse?> GetMyProfileAsync(string currentUserId)
        {
            var user = await _userRepo.GetByIdAsync(currentUserId);
            return user == null ? null : AuthService.MapToUserResponse(user);
        }

        public async Task<UserResponse?> UpdateMyProfileAsync(string currentUserId, UpdateProfileRequest request)
        {
            var user = await _userRepo.GetByIdAsync(currentUserId);
            if (user == null) throw new Exception("User not found");

            // Chỉ cập nhật field được truyền lên, giữ nguyên field không truyền
            if (request.Name     != null) user.Name     = request.Name;
            if (request.Bio      != null) user.Bio      = request.Bio;
            if (request.Avatar   != null) user.Avatar   = request.Avatar;
            if (request.Location != null) user.Location = request.Location;
            user.UpdatedAt = DateTime.UtcNow;

            await _userRepo.UpdateAsync(currentUserId, user);
            return AuthService.MapToUserResponse(user);
        }

        // ─── CHANGE PASSWORD ──────────────────────────────────────────

        public async Task ChangePasswordAsync(string currentUserId, ChangePasswordRequest request)
        {
            var user = await _userRepo.GetByIdAsync(currentUserId);
            if (user == null) throw new Exception("User not found");

            // User Google OAuth không có password
            if (string.IsNullOrWhiteSpace(user.PasswordHash))
                throw new Exception("This account uses Google sign-in and has no password");

            if (!BCrypt.Net.BCrypt.Verify(request.OldPassword, user.PasswordHash))
                throw new Exception("Current password is incorrect");

            if (request.NewPassword != request.ConfirmPassword)
                throw new Exception("New password and confirm password do not match");

            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.NewPassword);
            user.UpdatedAt    = DateTime.UtcNow;

            await _userRepo.UpdateAsync(currentUserId, user);
        }
    }
}