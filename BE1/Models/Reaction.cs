using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace BE1.Models
{
    public class Reaction
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; } = string.Empty;

        [BsonElement("userId")]
        public string UserId { get; set; } = string.Empty;

        [BsonElement("targetType")]
        public string TargetType { get; set; } = string.Empty; // "post" hoặc "comment"

        [BsonElement("targetId")]
        public string TargetId { get; set; } = string.Empty;

        [BsonElement("type")]
        public string Type { get; set; } = string.Empty; // "like", "unicorn", "fire", "bookmark"

        [BsonElement("createdAt")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}