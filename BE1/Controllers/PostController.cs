using BE1.DTOs;
using BE1.DTOs.PostDTOs;
using BE1.Services.Interface;
using Microsoft.AspNetCore.Mvc;

namespace BE1.Controllers
{
    [Route("api/posts")]
    [ApiController]
    public class PostController : ControllerBase
    {
        private readonly IPostService _postService;

        public PostController(IPostService postService)
        {
            _postService = postService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
            => Ok(await _postService.GetAllAsync());

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(string id)
        {
            var post = await _postService.GetByIdAsync(id);
            return post == null ? NotFound(new { message = "Post not found" }) : Ok(post);
        }

        [HttpGet("author/{authorId}")]
        public async Task<IActionResult> GetByAuthor(string authorId)
            => Ok(await _postService.GetByAuthorIdAsync(authorId));

        [HttpPost]
        public async Task<IActionResult> Create(
    [FromBody] PostCreateRequest request
)
        {
            try
            {
                // 🔥 đọc thủ công (an toàn nhất)
                var authorId = Request.Headers["authorId"].FirstOrDefault();

                Console.WriteLine("AUTHOR HEADER: " + authorId);

                if (string.IsNullOrEmpty(authorId))
                {
                    return BadRequest(new { message = "Missing authorId" });
                }

                var post = await _postService.CreateAsync(request, authorId);

                return CreatedAtAction(nameof(GetById), new { id = post.Id }, post);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(string id, [FromBody] PostUpdateRequest request)
        {
            var post = await _postService.UpdateAsync(id, request);
            return post == null ? NotFound() : Ok(post);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            await _postService.DeleteAsync(id);
            return NoContent();
        }
    }
}