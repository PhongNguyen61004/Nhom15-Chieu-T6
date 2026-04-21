using BE1.DTOs.Auth;
using BE1.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace BE1.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        private string? CurrentUserId => User.FindFirstValue(ClaimTypes.NameIdentifier);

        // ─── PUBLIC ───────────────────────────────────────────────────

        // GET api/users/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(string id)
        {
            var user = await _userService.GetByIdAsync(id);
            return user == null ? NotFound(new { message = "User not found" }) : Ok(user);
        }

        // GET api/users/username/{username}
        [HttpGet("username/{username}")]
        public async Task<IActionResult> GetByUsername(string username)
        {
            var user = await _userService.GetByUsernameAsync(username);
            return user == null ? NotFound(new { message = "User not found" }) : Ok(user);
        }

        // ─── PROFILE (yêu cầu đăng nhập) ─────────────────────────────

        // GET api/users/profile
        [Authorize]
        [HttpGet("profile")]
        public async Task<IActionResult> GetMyProfile()
        {
            if (CurrentUserId == null) return Unauthorized();

            var profile = await _userService.GetMyProfileAsync(CurrentUserId);
            return profile == null
                ? NotFound(new { message = "User not found" })
                : Ok(profile);
        }

        // PUT api/users/profile
        [Authorize]
        [HttpPut("profile")]
        public async Task<IActionResult> UpdateMyProfile([FromBody] UpdateProfileRequest request)
        {
            try
            {
                if (CurrentUserId == null) return Unauthorized();

                var updated = await _userService.UpdateMyProfileAsync(CurrentUserId, request);
                return Ok(new { message = "Profile updated successfully", data = updated });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        // PUT api/users/profile/change-password
        [Authorize]
        [HttpPut("profile/change-password")]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordRequest request)
        {
            try
            {
                if (CurrentUserId == null) return Unauthorized();

                await _userService.ChangePasswordAsync(CurrentUserId, request);
                return Ok(new { message = "Password changed successfully" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
    }
}