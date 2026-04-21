using BE1.DTOs;
using BE1.DTOs.Auth;
using BE1.Models;

namespace BE1.Services.Interfaces
{
    public interface IUserService
    {
        Task<UserResponse?> GetByIdAsync(string id);
        Task<UserResponse?> GetByUsernameAsync(string username);
        Task<UserResponse?> GetMyProfileAsync(string currentUserId);
        Task<UserResponse?> UpdateMyProfileAsync(string currentUserId, UpdateProfileRequest request);
        Task ChangePasswordAsync(string currentUserId, ChangePasswordRequest request);
    }
}