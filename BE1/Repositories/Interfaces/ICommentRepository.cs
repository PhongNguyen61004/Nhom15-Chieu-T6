using BE1.Models;

namespace BE1.Repositories.Interfaces
{
    public interface ICommentRepository : IBaseRepository<Comment>
    {
        Task<List<Comment>> GetByPostIdAsync(string postId);
        Task<List<Comment>> GetRepliesAsync(string parentId);
    }
}