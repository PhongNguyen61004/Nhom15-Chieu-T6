using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BE1.DTOs.Auth
{
    public class UpdateProfileRequest
    {
         public string? Name     { get; set; }
        public string? Bio      { get; set; }
        public string? Avatar   { get; set; }
        public string? Location { get; set; }
    }
}