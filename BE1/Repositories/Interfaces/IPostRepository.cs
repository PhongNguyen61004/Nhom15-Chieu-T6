using BE1.Models;

namespace BE1.Repositories.Interfaces
{
    public interface IPostRepository : IBaseRepository<Post>
    {
        Task<List<Post>> GetByAuthorIdAsync(string authorId);
        Task<Post?> GetBySlugAsync(string slug);
        Task<List<Post>> GetPublishedPostsAsync();
        Task<List<Post>> GetPostsByTagAsync(string tag);
        
        // Phiên bản nâng cao với phân trang và lọc
        Task<(List<Post> Posts, long TotalCount)> GetPostsPagedAsync(
            int page = 1, 
            int pageSize = 10, 
            string? status = null,
            string? authorId = null,
            string? search = null);
    }
}