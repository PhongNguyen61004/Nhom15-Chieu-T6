using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BE1.DTOs;
using BE1.Models;
using BE1.Services.Interface;
using Microsoft.AspNetCore.Mvc;

namespace BE1.Controllers
{
    [ApiController]
    [Route("users")]
    [Produces("application/json")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }
        /// <summary>Lấy danh sách tất cả người dùng</summary>
        /// <response code="200">Trả về danh sách người dùng</response>
        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<User>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetAll()
        {
            var users = await _userService.GetAllUsers();
            return Ok(new { success = true, count = users.Count, data = users });
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(string id)
        {
            var user = await _userService.GetUserById(id);
            if (user == null)
                return NotFound(new { success = false, message = "User not found" });

            return Ok(new { success = true, data = user });
        }

        [HttpPost]
        [ProducesResponseType(typeof(User), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Create([FromBody] UserDto dto)
        {
            var user = await _userService.CreateUser(dto);
            return CreatedAtAction(nameof(GetById), new { id = user.Id },
                new { success = true, message = "Tạo người dùng thành công", data = user });
        }
        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Update(string id, [FromBody] UserDto dto)
        {
            var updated = await _userService.UpdateUser(id, dto);
            if (!updated)
                return NotFound(new { success = false, message = $"Không tìm thấy user với ID: {id}" });

            return Ok(new { success = true, message = "Cập nhật thành công" });
        }

        /// <summary>Xóa người dùng</summary>
        /// <param name="id">MongoDB ObjectId</param>
        /// <response code="200">Xóa thành công</response>
        /// <response code="404">Không tìm thấy</response>
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Delete(string id)
        {
            var deleted = await _userService.DeleteUser(id);
            if (!deleted)
                return NotFound(new { success = false, message = $"Không tìm thấy user với ID: {id}" });

            return Ok(new { success = true, message = "Xóa người dùng thành công" });
        }
    }

}