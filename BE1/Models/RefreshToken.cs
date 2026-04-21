using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace BE1.Models
{
    public class RefreshToken
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; } = string.Empty;

        [BsonElement("user_id")]
        [BsonRepresentation(BsonType.ObjectId)]
        public string UserId { get; set; } = string.Empty;

        [BsonElement("token_hash")]
        public string TokenHash { get; set; } = string.Empty;

        [BsonElement("device_info")]
        [BsonIgnoreIfNull]
        public string? DeviceInfo { get; set; }

        [BsonElement("ip_address")]
        [BsonIgnoreIfNull]
        public string? IpAddress { get; set; }

        [BsonElement("expires_at")]
        public DateTime ExpiresAt { get; set; }

        [BsonElement("createdAt")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [BsonElement("updatedAt")]
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}