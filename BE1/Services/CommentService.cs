using BE1.DTOs;
using BE1.DTOs.CommentDTOs;
using BE1.Models;
using BE1.Repositories.Interfaces;
using BE1.Services.Interfaces;

namespace BE1.Services
{
    public class CommentService : ICommentService
    {
        private readonly ICommentRepository _commentRepository;

        public CommentService(ICommentRepository commentRepository)
        {
            _commentRepository = commentRepository;
        }

        public async Task<CommentResponse> CreateAsync(CommentCreateRequest request, string authorId)
        {
            int depth = 0;
            if (!string.IsNullOrEmpty(request.ParentId))
            {
                var parent = await _commentRepository.GetByIdAsync(request.ParentId);
                depth = parent?.Depth + 1 ?? 1;
            }

            var comment = new Comment
            {
                PostId = request.PostId,
                AuthorId = authorId,
                ParentId = request.ParentId,
                Content = request.Content,
                Depth = depth,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            var created = await _commentRepository.CreateAsync(comment);
            return MapToResponse(created);
        }

        public async Task<List<CommentResponse>> GetByPostIdAsync(string postId)
        {
            var comments = await _commentRepository.GetByPostIdAsync(postId);
            return comments.Select(MapToResponse).ToList();
        }

        public async Task<CommentResponse?> GetByIdAsync(string id)
        {
            var comment = await _commentRepository.GetByIdAsync(id);
            return comment == null ? null : MapToResponse(comment);
        }

        public async Task<CommentResponse?> UpdateAsync(string id, CommentUpdateRequest request, string authorId)
        {
            var comment = await _commentRepository.GetByIdAsync(id);
            if (comment == null || comment.AuthorId != authorId)
                return null;

            if (!string.IsNullOrEmpty(request.Content))
            {
                comment.Content = request.Content;
                comment.IsEdited = true;
                comment.UpdatedAt = DateTime.UtcNow;
            }

            await _commentRepository.UpdateAsync(id, comment);
            return MapToResponse(comment);
        }

        public async Task DeleteAsync(string id, string authorId)
        {
            var comment = await _commentRepository.GetByIdAsync(id);
            if (comment != null && comment.AuthorId == authorId)
            {
                await _commentRepository.DeleteAsync(id);
            }
        }

        private CommentResponse MapToResponse(Comment comment)
        {
            return new CommentResponse
            {
                Id = comment.Id,
                PostId = comment.PostId,
                AuthorId = comment.AuthorId,
                ParentId = comment.ParentId,
                Content = comment.Content,
                LikesCount = comment.LikesCount,
                IsEdited = comment.IsEdited,
                Depth = comment.Depth,
                CreatedAt = comment.CreatedAt,
                UpdatedAt = comment.UpdatedAt
            };
        }
    }
}