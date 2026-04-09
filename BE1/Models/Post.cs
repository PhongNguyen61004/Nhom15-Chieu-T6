using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace BE1.Models
{
    public class Post
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; } = string.Empty;

        [BsonElement("authorId")]
        [BsonRepresentation(BsonType.ObjectId)]   // ← Thêm dòng này là quan trọng nhất
        public string AuthorId { get; set; } = string.Empty;

        [BsonElement("title")]
        public string Title { get; set; } = string.Empty;

        [BsonElement("slug")]
        public string Slug { get; set; } = string.Empty;

        [BsonElement("content")]
        public string Content { get; set; } = string.Empty;

        [BsonElement("coverImage")]
        public string? CoverImage { get; set; }

        [BsonElement("tags")]
        public List<string> Tags { get; set; } = new();

        [BsonElement("status")]
        public string Status { get; set; } = "draft";

        [BsonElement("readingTime")]
        public int ReadingTime { get; set; } = 0;

        [BsonElement("viewsCount")]
        public int ViewsCount { get; set; } = 0;

        [BsonElement("likesCount")]
        public int LikesCount { get; set; } = 0;

        [BsonElement("commentsCount")]
        public int CommentsCount { get; set; } = 0;

        [BsonElement("bookmarksCount")]
        public int BookmarksCount { get; set; } = 0;

        [BsonElement("publishedAt")]
        public DateTime? PublishedAt { get; set; }

        [BsonElement("createdAt")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [BsonElement("updatedAt")]
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}