using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace BE1.Models
{
    public class Comment
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; } = string.Empty;

        [BsonElement("postId")]
        [BsonRepresentation(BsonType.ObjectId)] // ✅ FIX
        public string PostId { get; set; } = string.Empty;

        [BsonElement("authorId")]
        [BsonRepresentation(BsonType.ObjectId)] // ✅ FIX
        public string AuthorId { get; set; } = string.Empty;

        [BsonElement("parentId")]
        [BsonRepresentation(BsonType.ObjectId)] // ✅ nên thêm luôn
        public string? ParentId { get; set; }

        [BsonElement("content")]
        public string Content { get; set; } = string.Empty;

        [BsonElement("likesCount")]
        public int LikesCount { get; set; } = 0;

        [BsonElement("isEdited")]
        public bool IsEdited { get; set; } = false;

        [BsonElement("depth")]
        public int Depth { get; set; } = 0;

        [BsonElement("createdAt")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [BsonElement("updatedAt")]
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}