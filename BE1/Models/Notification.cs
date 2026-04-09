using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace BE1.Models
{
    public class Notification
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; } = string.Empty;

        [BsonElement("recipientId")]
        public string RecipientId { get; set; } = string.Empty;

        [BsonElement("actorId")]
        public string ActorId { get; set; } = string.Empty;

        [BsonElement("type")]
        public string Type { get; set; } = string.Empty; // "follow", "like", "comment", "mention"

        [BsonElement("targetType")]
        public string TargetType { get; set; } = string.Empty; // "post", "comment", "user"

        [BsonElement("targetId")]
        public string TargetId { get; set; } = string.Empty;

        [BsonElement("message")]
        public string Message { get; set; } = string.Empty;

        [BsonElement("isRead")]
        public bool IsRead { get; set; } = false;

        [BsonElement("createdAt")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}