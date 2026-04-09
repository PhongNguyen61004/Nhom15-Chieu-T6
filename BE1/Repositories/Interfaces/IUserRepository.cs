using BE1.Models;

namespace BE1.Repositories.Interfaces
{
    public interface IUserRepository : IBaseRepository<User>
    {
        Task<User?> GetByUsernameAsync(string username);
        Task<User?> GetByEmailAsync(string email);
        Task<bool> IsUsernameExistAsync(string username);
        Task<bool> IsEmailExistAsync(string email);
    }
}