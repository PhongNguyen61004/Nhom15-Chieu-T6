using BE1.DTOs;
using BE1.DTOs.Auth;
using BE1.Models;

namespace BE1.Services.Interfaces
{
    public interface IUserService
    {
        Task<UserResponse> RegisterAsync(RegisterRequest request);
        Task<LoginResponse> LoginAsync(LoginRequest request);
        Task<UserResponse?> GetByIdAsync(string id);
        Task<UserResponse?> GetByUsernameAsync(string username);
        Task<bool> UpdateAsync(string id, User user);
    }
}