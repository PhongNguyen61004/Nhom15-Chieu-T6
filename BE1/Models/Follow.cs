using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace BE1.Models
{
    public class Follow
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; } = string.Empty;

        [BsonElement("followerId")]
        public string FollowerId { get; set; } = string.Empty;

        [BsonElement("followType")]
        public string FollowType { get; set; } = string.Empty; // "user" hoặc "tag"

        [BsonElement("followingId")]
        public string FollowingId { get; set; } = string.Empty;

        [BsonElement("createdAt")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}