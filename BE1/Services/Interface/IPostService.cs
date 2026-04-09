using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BE1.DTOs.PostDTOs;

namespace BE1.Services.Interface
{
    public interface IPostService
    {
        Task<PostResponse> CreateAsync(PostCreateRequest request, string authorId);
        Task<PostResponse?> GetByIdAsync(string id);
        Task<List<PostResponse>> GetByAuthorIdAsync(string authorId);
        Task<List<PostResponse>> GetAllAsync();
        Task<PostResponse?> UpdateAsync(string id, PostUpdateRequest request);
        Task DeleteAsync(string id);
    }
}