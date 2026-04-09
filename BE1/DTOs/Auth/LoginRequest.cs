using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BE1.DTOs.Auth
{
    // Request khi đăng nhập
    public class LoginRequest
    {
        [Required]
        public string UsernameOrEmail { get; set; } = string.Empty;

        [Required]
        public string Password { get; set; } = string.Empty;
    }
}