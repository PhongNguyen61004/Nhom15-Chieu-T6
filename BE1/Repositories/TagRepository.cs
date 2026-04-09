
using BE1.Models;
using BE1.Repositories.Interfaces;
using MongoDB.Driver;

namespace BE1.Repositories
{
    public class TagRepository : MongoRepository<Models.Tag>, ITagRepository
    {
        public TagRepository(IMongoDatabase database) : base(database, "tags") { }

        public async Task<Models.Tag?> GetBySlugAsync(string slug)
        {
            var filter = Builders<Models.Tag>.Filter.Eq(t => t.Slug, slug);
            return await _collection.Find(filter).FirstOrDefaultAsync();
        }
    }
}