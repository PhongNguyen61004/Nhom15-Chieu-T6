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

        // nullable vì Google OAuth user không có password
        [BsonElement("passwordHash")]
        [BsonIgnoreIfNull]
        public string? PasswordHash { get; set; }

        [BsonElement("name")]
        [BsonIgnoreIfNull]
        public string? Name { get; set; }

        [BsonElement("bio")]
        [BsonIgnoreIfNull]
        public string? Bio { get; set; }

        [BsonElement("avatar")]
        [BsonIgnoreIfNull]
        public string? Avatar { get; set; }

        [BsonElement("location")]
        [BsonIgnoreIfNull]
        public string? Location { get; set; }

        [BsonElement("role")]
        public string Role { get; set; } = "user";

        [BsonElement("followersCount")]
        public int FollowersCount { get; set; } = 0;

        [BsonElement("followingCount")]
        public int FollowingCount { get; set; } = 0;

        [BsonElement("isBanned")]
        [BsonIgnoreIfNull]
        public bool? IsBanned { get; set; }

        [BsonElement("createdAt")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [BsonElement("updatedAt")]
        [BsonIgnoreIfNull]
        public DateTime? UpdatedAt { get; set; }

        // Mongoose version field — ignore khi đọc để không crash
        [BsonElement("__v")]
        [BsonIgnoreIfNull]
        public int? Version { get; set; }
    }
}