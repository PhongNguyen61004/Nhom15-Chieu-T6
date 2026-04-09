using BE1.Models;
using BE1.Repositories.Interfaces;
using MongoDB.Bson;
using MongoDB.Driver;

namespace BE1.Repositories
{
    public class PostRepository : MongoRepository<Post>, IPostRepository
    {
        public PostRepository(IMongoDatabase database) 
            : base(database, "posts") { }

        public async Task<List<Post>> GetByAuthorIdAsync(string authorId)
        {
            var filter = Builders<Post>.Filter.Eq(p => p.AuthorId, authorId);
            return await _collection.Find(filter)
                .Sort(Builders<Post>.Sort.Descending(p => p.CreatedAt))
                .ToListAsync();
        }

        public async Task<Post?> GetBySlugAsync(string slug)
        {
            var filter = Builders<Post>.Filter.Eq(p => p.Slug, slug);
            return await _collection.Find(filter).FirstOrDefaultAsync();
        }

        public async Task<List<Post>> GetPublishedPostsAsync()
        {
            var filter = Builders<Post>.Filter.Eq(p => p.Status, "published");
            return await _collection.Find(filter)
                .Sort(Builders<Post>.Sort.Descending(p => p.PublishedAt))
                .ToListAsync();
        }

        public async Task<List<Post>> GetPostsByTagAsync(string tag)
        {
            var filter = Builders<Post>.Filter.Eq("tags", tag); // Tìm trong array tags
            return await _collection.Find(filter)
                .Sort(Builders<Post>.Sort.Descending(p => p.CreatedAt))
                .ToListAsync();
        }

        // Phiên bản mạnh nhất - Hỗ trợ phân trang + search + filter
        public async Task<(List<Post> Posts, long TotalCount)> GetPostsPagedAsync(
            int page = 1, 
            int pageSize = 10, 
            string? status = null,
            string? authorId = null,
            string? search = null)
        {
            var filterBuilder = Builders<Post>.Filter;
            var filter = filterBuilder.Empty;

            // Filter theo status
            if (!string.IsNullOrEmpty(status))
            {
                filter &= filterBuilder.Eq(p => p.Status, status);
            }

            // Filter theo author
            if (!string.IsNullOrEmpty(authorId))
            {
                filter &= filterBuilder.Eq(p => p.AuthorId, authorId);
            }

            // Search theo title hoặc content
            if (!string.IsNullOrEmpty(search))
            {
                var searchFilter = filterBuilder.Or(
                    filterBuilder.Regex(p => p.Title, new BsonRegularExpression(search, "i")),
                    filterBuilder.Regex(p => p.Content, new BsonRegularExpression(search, "i"))
                );
                filter &= searchFilter;
            }

            // Đếm tổng số records
            var totalCount = await _collection.CountDocumentsAsync(filter);

            // Lấy dữ liệu có phân trang
            var posts = await _collection.Find(filter)
                .Sort(Builders<Post>.Sort.Descending(p => p.CreatedAt))
                .Skip((page - 1) * pageSize)
                .Limit(pageSize)
                .ToListAsync();

            return (posts, totalCount);
        }
    }
}