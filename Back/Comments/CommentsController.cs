using InventoryEyeBack.Posts;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace InventoryEyeBack.Comments
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentsController : ControllerBase
    {
        // GET: api/<CommentsController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<CommentsController>/5
        [HttpGet("{id}")]
        public CommentsModel Get(int id)
        {
            CommentsModel comment = new CommentsModel();
            return comment.ReadCommentByCommentId(id);
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
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
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
