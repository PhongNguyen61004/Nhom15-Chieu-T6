using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BE1.DTOs.Auth
{
    
    // Response khi login thành công (có token)
    public class LoginResponse
    {
        public UserResponse User { get; set; } = null!;
        public string Token { get; set; } = string.Empty;
    }
}