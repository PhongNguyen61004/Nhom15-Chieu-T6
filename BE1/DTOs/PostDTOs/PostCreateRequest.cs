using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BE1.DTOs.PostDTOs
{
    public class PostCreateRequest
    {
        [Required]
        [MaxLength(200)]
        public string Title { get; set; } = string.Empty;

        [Required]
        public string Content { get; set; } = string.Empty;

        public string? CoverImage { get; set; }
        public List<string> Tags { get; set; } = new();
        public string Status { get; set; } = "draft"; // draft hoặc published
    }
}