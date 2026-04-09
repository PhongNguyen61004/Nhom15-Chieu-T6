using BE1.Models;

namespace BE1.Repositories.Interfaces
{
    public interface IReactionRepository : IBaseRepository<Reaction>
    {
        Task<Reaction?> GetByUserAndTargetAsync(string userId, string targetType, string targetId);
    }
}