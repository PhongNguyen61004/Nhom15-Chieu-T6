using BE1.DTOs.Auth;
using BE1.Services.Interface;
using BE1.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace BE1.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        // private readonly IAuthService _authService;

        // public AuthController(IAuthService authService)
        // {
        //     _authService = authService;
        // }

        // // POST api/auth/register
        // [HttpPost("register")]
        // public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        // {
        //     try
        //     {
        //         var result = await _authService.RegisterAsync(request, HttpContext);
        //         return Ok(new
        //         {
        //             message = "Register successful",
        //             data    = result
        //         });
        //     }
        //     catch (Exception ex)
        //     {
        //         return BadRequest(new { message = ex.Message });
        //     }
        // }

        // // POST api/auth/login
        // [HttpPost("login")]
        // public async Task<IActionResult> Login([FromBody] LoginRequest request)
        // {
        //     try
        //     {
        //         var result = await _authService.LoginAsync(request, HttpContext);
        //         return Ok(new
        //         {
        //             message = "Login successful",
        //             data    = result
        //         });
        //     }
        //     catch (Exception ex)
        //     {
        //         return Unauthorized(new { message = ex.Message });
        //     }
        // }

        // // POST api/auth/refresh
        // [HttpPost("refresh")]
        // public async Task<IActionResult> Refresh([FromBody] RefreshTokenRequest? body)
        // {
        //     try
        //     {
        //         var token = Request.Cookies["refresh_token"]
        //             ?? body?.RefreshToken;

        //         if (string.IsNullOrWhiteSpace(token))
        //             return Unauthorized(new { message = "Refresh token is required" });

        //         var result = await _authService.RefreshTokenAsync(token, HttpContext);
        //         return Ok(new
        //         {
        //             message = "Token refreshed successfully",
        //             data    = result
        //         });
        //     }
        //     catch (Exception ex)
        //     {
        //         return Unauthorized(new { message = ex.Message });
        //     }
        // }

        // // POST api/auth/logout
        // [Authorize]
        // [HttpPost("logout")]
        // public async Task<IActionResult> Logout()
        // {
        //     try
        //     {
        //         var userId = User.FindFirstValue("user_id")!;
        //         await _authService.LogoutAsync(userId);

        //         Response.Cookies.Delete("refresh_token");
        //         return Ok(new { message = "Logged out successfully" });
        //     }
        //     catch (Exception ex)
        //     {
        //         return BadRequest(new { message = ex.Message });
        //     }
        // }

        // // GET api/auth/me
        // [Authorize]
        // [HttpGet("me")]
        // public IActionResult Me()
        // {
        //     return Ok(new
        //     {
        //         id    = User.FindFirstValue("user_id"),
        //         email = User.FindFirstValue("email")
        //     });
        // }
    }
}