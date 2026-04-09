using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BE1.DTOs.CommentDTOs
{
    public class CommentResponse
    {
        public string Id { get; set; } = string.Empty;
        public string PostId { get; set; } = string.Empty;
        public string AuthorId { get; set; } = string.Empty;
        public string? ParentId { get; set; }
        public string Content { get; set; } = string.Empty;
        public int LikesCount { get; set; } = 0;
        public bool IsEdited { get; set; } = false;
        public int Depth { get; set; } = 0;
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}