using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BE1.DTOs.Auth;

namespace BE1.Services.Interface
{
    public interface IAuthService
    {
        Task<LoginResponse> RegisterAsync(RegisterRequest request, HttpContext httpContext);
        Task<LoginResponse> LoginAsync(LoginRequest request, HttpContext httpContext);
        Task<TokenResponse> RefreshTokenAsync(string refreshToken, HttpContext httpContext);
        Task LogoutAsync(string userId);
    }
}