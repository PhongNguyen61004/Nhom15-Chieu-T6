using BE1.Models;
using BE1.Repositories.Interfaces;
using MongoDB.Driver;

namespace BE1.Repositories
{
    public class FollowRepository : MongoRepository<Follow>, IFollowRepository
    {
        public FollowRepository(IMongoDatabase database) 
            : base(database, "follows") { }

        public async Task<bool> IsFollowingAsync(string followerId, string followType, string followingId)
        {
            var filter = Builders<Follow>.Filter.And(
                Builders<Follow>.Filter.Eq(f => f.FollowerId, followerId),
                Builders<Follow>.Filter.Eq(f => f.FollowType, followType),
                Builders<Follow>.Filter.Eq(f => f.FollowingId, followingId)
            );
            return await _collection.Find(filter).AnyAsync();
        }
    }
}