using BE1.Models;
using BE1.Repositories.Interfaces;
using MongoDB.Driver;

namespace BE1.Repositories
{
    public class CommentRepository : MongoRepository<Comment>, ICommentRepository
    {
        public CommentRepository(IMongoDatabase database) 
            : base(database, "comments") { }

        public async Task<List<Comment>> GetByPostIdAsync(string postId)
        {
            var filter = Builders<Comment>.Filter.Eq(c => c.PostId, postId);
            return await _collection.Find(filter).ToListAsync();
        }

        public async Task<List<Comment>> GetRepliesAsync(string parentId)
        {
            var filter = Builders<Comment>.Filter.Eq(c => c.ParentId, parentId);
            return await _collection.Find(filter).ToListAsync();
        }
    }
}