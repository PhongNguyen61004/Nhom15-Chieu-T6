using BE1.Models;
using BE1.Repositories.Interfaces;
using MongoDB.Driver;

namespace BE1.Repositories
{
    public class NotificationRepository : MongoRepository<Notification>, INotificationRepository
    {
        public NotificationRepository(IMongoDatabase database) 
            : base(database, "notifications") { }

        public async Task<List<Notification>> GetByRecipientIdAsync(string recipientId, bool? isRead = null)
        {
            var filter = Builders<Notification>.Filter.Eq(n => n.RecipientId, recipientId);

            if (isRead.HasValue)
            {
                filter &= Builders<Notification>.Filter.Eq(n => n.IsRead, isRead.Value);
            }

            return await _collection.Find(filter)
                .Sort(Builders<Notification>.Sort.Descending(n => n.CreatedAt))
                .ToListAsync();
        }
    }
}