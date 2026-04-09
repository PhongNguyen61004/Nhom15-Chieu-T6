using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BE1.Models;

namespace BE1.Repositories.Interfaces
{
    public interface ITagRepository : IBaseRepository<Tag>
    {
        Task<Tag?> GetBySlugAsync(string slug);
    }
}