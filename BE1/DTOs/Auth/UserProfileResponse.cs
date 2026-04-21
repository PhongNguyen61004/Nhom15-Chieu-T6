using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BE1.DTOs.Auth
{
    public class UserProfileResponse : UserResponse
    {
        public DateTime? UpdatedAt { get; set; }
    }
}