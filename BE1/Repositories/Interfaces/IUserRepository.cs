using BE1.Models;

namespace BE1.Repositories.Interfaces
{
    public interface IUserRepository
    {
        Task<User?> GetByIdAsync(string id);
        Task<User?> GetByUsernameAsync(string username);
        Task<User?> GetByEmailAsync(string email);
        Task<User>  CreateAsync(User user);
        Task        UpdateAsync(string id, User user);
        Task        DeleteAsync(string id);
        Task<bool>  IsUsernameExistAsync(string username);
        Task<bool>  IsEmailExistAsync(string email);
    }
}