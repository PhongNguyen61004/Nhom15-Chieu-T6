using BE1.Models;

namespace BE1.Repositories.Interfaces
{
    public interface INotificationRepository : IBaseRepository<Notification>
    {
        Task<List<Notification>> GetByRecipientIdAsync(string recipientId, bool? isRead = null);
    }
}