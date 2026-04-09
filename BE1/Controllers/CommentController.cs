using BE1.DTOs;
using BE1.DTOs.CommentDTOs;
using BE1.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace BE1.Controllers
{
    [Route("api/comments")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly ICommentService _commentService;

        public CommentController(ICommentService commentService)
        {
            _commentService = commentService;
        }

        [HttpGet("post/{postId}")]
        public async Task<IActionResult> GetByPost(string postId)
        {
            var comments = await _commentService.GetByPostIdAsync(postId);
            return Ok(comments);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(string id)
        {
            var comment = await _commentService.GetByIdAsync(id);
            return comment == null ? NotFound() : Ok(comment);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CommentCreateRequest request, [FromHeader] string authorId)
        {
            try
            {
                var comment = await _commentService.CreateAsync(request, authorId);
                return CreatedAtAction(nameof(GetById), new { id = comment.Id }, comment);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(string id, [FromBody] CommentUpdateRequest request, [FromHeader] string authorId)
        {
            var comment = await _commentService.UpdateAsync(id, request, authorId);
            return comment == null ? NotFound(new { message = "Comment not found or unauthorized" }) : Ok(comment);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id, [FromHeader] string authorId)
        {
            await _commentService.DeleteAsync(id, authorId);
            return NoContent();
        }
    }
}