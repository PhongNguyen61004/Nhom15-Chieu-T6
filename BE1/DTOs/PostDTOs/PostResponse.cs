using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BE1.DTOs.PostDTOs
{
    public class PostResponse
    {
        public string Id { get; set; } = string.Empty;
        public string AuthorId { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public string Slug { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
        public string? CoverImage { get; set; }
        public List<string> Tags { get; set; } = new();
        public string Status { get; set; } = "draft";
        public int ReadingTime { get; set; }
        public int ViewsCount { get; set; }
        public int LikesCount { get; set; }
        public int CommentsCount { get; set; }
        public int BookmarksCount { get; set; }
        public DateTime? PublishedAt { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}