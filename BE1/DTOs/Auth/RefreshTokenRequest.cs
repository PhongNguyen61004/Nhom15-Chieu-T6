using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BE1.DTOs.Auth
{
    public class RefreshTokenRequest
    {
        // Optional — có thể lấy từ cookie thay vì body
        public string? RefreshToken { get; set; }
    }
}