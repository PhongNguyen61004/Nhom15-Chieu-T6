using BE1.Models;
using BE1.Repositories.Interfaces;
using MongoDB.Driver;

namespace BE1.Repositories
{
    public class RefreshTokenRepository : IRefreshTokenRepository
    {
        private readonly IMongoCollection<RefreshToken> _collection;

        public RefreshTokenRepository(IMongoDatabase database)
        {
            _collection = database.GetCollection<RefreshToken>("refreshToken");
        }

        public async Task<RefreshToken> CreateAsync(RefreshToken token)
        {
            await _collection.InsertOneAsync(token);
            return token;
        }

        // Lấy token mới nhất còn hạn của user
        public async Task<RefreshToken?> GetValidByUserIdAsync(string userId)
        {
            var filter = Builders<RefreshToken>.Filter.And(
                Builders<RefreshToken>.Filter.Eq(t => t.UserId, userId),
                Builders<RefreshToken>.Filter.Gt(t => t.ExpiresAt, DateTime.UtcNow)
            );
            return await _collection
                .Find(filter)
                .SortByDescending(t => t.CreatedAt)
                .FirstOrDefaultAsync();
        }

        // Xóa tất cả token của user (dùng khi logout)
        public async Task DeleteByUserIdAsync(string userId)
        {
            var filter = Builders<RefreshToken>.Filter.Eq(t => t.UserId, userId);
            await _collection.DeleteManyAsync(filter);
        }

        // Xóa token đã hết hạn (dọn dẹp định kỳ)
        public async Task DeleteExpiredByUserIdAsync(string userId)
        {
            var filter = Builders<RefreshToken>.Filter.And(
                Builders<RefreshToken>.Filter.Eq(t => t.UserId, userId),
                Builders<RefreshToken>.Filter.Lte(t => t.ExpiresAt, DateTime.UtcNow)
            );
            await _collection.DeleteManyAsync(filter);
        }
    }
}