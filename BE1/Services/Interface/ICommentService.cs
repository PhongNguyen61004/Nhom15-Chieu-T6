using BE1.DTOs;
using BE1.DTOs.CommentDTOs;

namespace BE1.Services.Interfaces
{
    public interface ICommentService
    {
        Task<CommentResponse> CreateAsync(CommentCreateRequest request, string authorId);
        Task<List<CommentResponse>> GetByPostIdAsync(string postId);
        Task<CommentResponse?> GetByIdAsync(string id);
        Task<CommentResponse?> UpdateAsync(string id, CommentUpdateRequest request, string authorId);
        Task DeleteAsync(string id, string authorId);
    }
}