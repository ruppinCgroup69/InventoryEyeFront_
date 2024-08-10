using InventoryEyeBack.Posts;
using InventoryEyeBack.Users;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace InventoryEyeBack.Comments
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentsController : ControllerBase
    {
        // GET: Read all comments api/<CommentsController>/5
        [HttpGet]
        public IEnumerable<CommentsModel> Get()
        {
            CommentsModel comment = new CommentsModel();
            return comment.ReadAllComments();
        }

        // GET: Read comment by comment id api/<CommentsController>/5
        [HttpGet("{commentId}")]
        public CommentsModel Get(int commentId)
        {
            CommentsModel comment = new CommentsModel();
            return comment.ReadCommentByCommentId(commentId);
        }

        // GET: Read Comments by PostId api/<CommentsController>/5
        [HttpGet("PostId/{postId}")]
        public List<CommentsModel> GetByPostId(int postId)
        {
            CommentsModel comments = new CommentsModel();
            return comments.ReadCommentsByPostId(postId);
        }

        // GET: Read Comments by userId api/<CommentsController>/5
        [HttpGet("UserId/{userId}")]
        public List<CommentsModel> GetByUserId(int userId)
        {
            CommentsModel comments = new CommentsModel();
            return comments.ReadCommentstByUserId(userId);
        }

        // POST api/<CommentsController>
        [HttpPost]
        public IActionResult Post([FromBody] CommentsModel comment)
        {
            int status = comment.InsertComment(comment);
            if (status == 1)
            {
                return Ok(comment);
            }
            else
            {
                return BadRequest();
            }
        }

        // PUT api/<CommentsController>/5
        [HttpPut("{commentId}")]
        public IActionResult Put([FromBody] CommentsModel comment)
        {
            int status = comment.UpdateComment(comment);
            if (status == 1)
            {
                return Ok(comment);
            }
            else
            {
                return BadRequest();
            }
        }

        // DELETE api/<CommentsController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            CommentsModel comment = new CommentsModel();
            comment.DeleteComment(id);
            return Ok();
        }
    }
}
