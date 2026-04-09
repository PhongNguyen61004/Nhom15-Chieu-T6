using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace BE1.Models
{
    public class Tag
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; } = string.Empty;

        [BsonElement("name")]
        public string Name { get; set; } = string.Empty;

        [BsonElement("slug")]
        public string Slug { get; set; } = string.Empty;

        [BsonElement("description")]
        public string? Description { get; set; }

        [BsonElement("color")]
        public string? Color { get; set; }

        [BsonElement("icon")]
        public string? Icon { get; set; }

        [BsonElement("postsCount")]
        public int PostsCount { get; set; } = 0;

        [BsonElement("followersCount")]
        public int FollowersCount { get; set; } = 0;

        [BsonElement("createdAt")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}