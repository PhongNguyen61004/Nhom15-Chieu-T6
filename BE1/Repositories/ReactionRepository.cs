using BE1.Models;
using BE1.Repositories.Interfaces;
using MongoDB.Driver;

namespace BE1.Repositories
{
    public class ReactionRepository : MongoRepository<Reaction>, IReactionRepository
    {
        public ReactionRepository(IMongoDatabase database) 
            : base(database, "reactions") { }

        public async Task<Reaction?> GetByUserAndTargetAsync(string userId, string targetType, string targetId)
        {
            var filter = Builders<Reaction>.Filter.And(
                Builders<Reaction>.Filter.Eq(r => r.UserId, userId),
                Builders<Reaction>.Filter.Eq(r => r.TargetType, targetType),
                Builders<Reaction>.Filter.Eq(r => r.TargetId, targetId)
            );
            return await _collection.Find(filter).FirstOrDefaultAsync();
        }
    }
}