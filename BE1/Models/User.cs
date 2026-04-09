using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace BE1.Models
{
    public class User
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; } = string.Empty;

        [BsonElement("username")]
        public string Username { get; set; } = string.Empty;

        [BsonElement("email")]
        public string Email { get; set; } = string.Empty;

        [BsonElement("passwordHash")]
        public string PasswordHash { get; set; } = string.Empty;

        [BsonElement("name")]
        public string? Name { get; set; }

        [BsonElement("bio")]
        public string? Bio { get; set; }

        [BsonElement("avatar")]
        public string? Avatar { get; set; }

        [BsonElement("location")]
        public string? Location { get; set; }

        [BsonElement("role")]
        public string Role { get; set; } = "user"; // user hoặc admin

        [BsonElement("followersCount")]
        public int FollowersCount { get; set; } = 0;

        [BsonElement("followingCount")]
        public int FollowingCount { get; set; } = 0;

        [BsonElement("createdAt")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}