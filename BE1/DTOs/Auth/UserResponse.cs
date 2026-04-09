using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BE1.DTOs.Auth
{
        public class UserResponse
    {
        public string Id { get; set; } = string.Empty;
        public string Username { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string? Name { get; set; }
        public string? Bio { get; set; }
        public string? Avatar { get; set; }
        public string? Location { get; set; }
        public string Role { get; set; } = "user";
        public int FollowersCount { get; set; }
        public int FollowingCount { get; set; }
        public DateTime CreatedAt { get; set; }
    }

}