using BE1.DTOs;
using BE1.DTOs.PostDTOs;
using BE1.Models;
using BE1.Repositories.Interfaces;
using BE1.Services.Interface;

namespace BE1.Services
{
    public class PostService : IPostService
    {
        private readonly IPostRepository _postRepository;

        public PostService(IPostRepository postRepository)
        {
            _postRepository = postRepository;
        }

        public async Task<PostResponse> CreateAsync(PostCreateRequest request, string authorId)
        {
            var slug = GenerateSlug(request.Title);

            var post = new Post
            {
                AuthorId = authorId,
                Title = request.Title,
                Slug = slug,
                Content = request.Content,
                CoverImage = request.CoverImage,
                Tags = request.Tags,
                Status = request.Status,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
                PublishedAt = request.Status == "published" ? DateTime.UtcNow : null
            };

            var createdPost = await _postRepository.CreateAsync(post);

            return MapToResponse(createdPost);
        }

        public async Task<PostResponse?> GetByIdAsync(string id)
        {
            var post = await _postRepository.GetByIdAsync(id);
            return post == null ? null : MapToResponse(post);
        }

        public async Task<List<PostResponse>> GetByAuthorIdAsync(string authorId)
        {
            var posts = await _postRepository.GetByAuthorIdAsync(authorId);
            return posts.Select(MapToResponse).ToList();
        }

        public async Task<List<PostResponse>> GetAllAsync()
        {
            var posts = await _postRepository.GetAllAsync();
            return posts.Select(MapToResponse).ToList();
        }

        public async Task<PostResponse?> UpdateAsync(string id, PostUpdateRequest request)
        {
            var post = await _postRepository.GetByIdAsync(id);
            if (post == null) return null;

            if (!string.IsNullOrEmpty(request.Title))
            {
                post.Title = request.Title;
                post.Slug = GenerateSlug(request.Title);
            }

            if (!string.IsNullOrEmpty(request.Content)) post.Content = request.Content;
            if (request.CoverImage != null) post.CoverImage = request.CoverImage;
            if (request.Tags != null) post.Tags = request.Tags;
            if (!string.IsNullOrEmpty(request.Status)) post.Status = request.Status;

            post.UpdatedAt = DateTime.UtcNow;

            if (request.Status == "published" && post.PublishedAt == null)
                post.PublishedAt = DateTime.UtcNow;

            await _postRepository.UpdateAsync(id, post);

            return MapToResponse(post);
        }

        public async Task DeleteAsync(string id)
        {
            await _postRepository.DeleteAsync(id);
        }

        // Helper method
        private string GenerateSlug(string title)
        {
            return title.ToLower()
                        .Replace(" ", "-")
                        .Replace(".", "")
                        .Replace("?", "")
                        .Replace("!", "");
        }

        private PostResponse MapToResponse(Post post)
        {
            return new PostResponse
            {
                Id = post.Id,
                AuthorId = post.AuthorId,
                Title = post.Title,
                Slug = post.Slug,
                Content = post.Content,
                CoverImage = post.CoverImage,
                Tags = post.Tags,
                Status = post.Status,
                ReadingTime = post.ReadingTime,
                ViewsCount = post.ViewsCount,
                LikesCount = post.LikesCount,
                CommentsCount = post.CommentsCount,
                BookmarksCount = post.BookmarksCount,
                PublishedAt = post.PublishedAt,
                CreatedAt = post.CreatedAt,
                UpdatedAt = post.UpdatedAt
            };
        }
    }
}