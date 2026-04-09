using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BE1.DTOs.CommentDTOs
{
    public class CommentCreateRequest
    {
        [Required]
        public string PostId { get; set; } = string.Empty;

        public string? ParentId { get; set; }   // null nếu là comment gốc

        [Required]
        [MaxLength(2000)]
        public string Content { get; set; } = string.Empty;
    }
}