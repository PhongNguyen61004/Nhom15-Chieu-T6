using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BE1.Models;

namespace BE1.Repositories.Interfaces
{
    public interface IRefreshTokenRepository
    {
        Task<RefreshToken>  CreateAsync(RefreshToken token);
        Task<RefreshToken?> GetValidByUserIdAsync(string userId);
        Task DeleteByUserIdAsync(string userId);
        Task DeleteExpiredByUserIdAsync(string userId);
    }
}