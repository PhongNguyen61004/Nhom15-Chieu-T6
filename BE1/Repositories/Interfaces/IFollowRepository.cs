using BE1.Models;

namespace BE1.Repositories.Interfaces
{
    public interface IFollowRepository : IBaseRepository<Follow>
    {
        Task<bool> IsFollowingAsync(string followerId, string followType, string followingId);
    }
}