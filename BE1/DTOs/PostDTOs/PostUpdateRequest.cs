using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BE1.DTOs.PostDTOs
{
    public class PostUpdateRequest
    {
        [MaxLength(200)]
        public string? Title { get; set; }

        public string? Content { get; set; }
        public string? CoverImage { get; set; }
        public List<string>? Tags { get; set; }
        public string? Status { get; set; }
    }
}