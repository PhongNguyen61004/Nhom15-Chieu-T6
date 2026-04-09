using BE1.Models;
using BE1.Repositories.Interfaces;
using MongoDB.Driver;

namespace BE1.Repositories
{
    public class UserRepository : MongoRepository<User>, IUserRepository
    {
        public UserRepository(IMongoDatabase database) 
            : base(database, "users") { }

        public async Task<User?> GetByUsernameAsync(string username)
        {
            var filter = Builders<User>.Filter.Eq(u => u.Username, username);
            return await _collection.Find(filter).FirstOrDefaultAsync();
        }

        public async Task<User?> GetByEmailAsync(string email)
        {
            var filter = Builders<User>.Filter.Eq(u => u.Email, email);
            return await _collection.Find(filter).FirstOrDefaultAsync();
        }

        public async Task<bool> IsUsernameExistAsync(string username)
        {
            var filter = Builders<User>.Filter.Eq(u => u.Username, username);
            return await _collection.Find(filter).AnyAsync();
        }

        public async Task<bool> IsEmailExistAsync(string email)
        {
            var filter = Builders<User>.Filter.Eq(u => u.Email, email);
            return await _collection.Find(filter).AnyAsync();
        }
    }
}