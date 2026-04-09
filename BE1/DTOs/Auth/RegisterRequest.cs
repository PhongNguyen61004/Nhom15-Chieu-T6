using System.ComponentModel.DataAnnotations;

namespace BE1.DTOs
{
    // Request khi đăng ký
    public class RegisterRequest
    {
        [Required]
        [MinLength(3)]
        public string Username { get; set; } = string.Empty;

        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required]
        [MinLength(6)]
        public string Password { get; set; } = string.Empty;

        public string? Name { get; set; }
        public string? Bio { get; set; }
        public string? Avatar { get; set; }
        public string? Location { get; set; }
    }

    

    // Response trả về cho client (không lộ passwordHash)

}