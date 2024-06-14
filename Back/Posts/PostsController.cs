using InventoryEyeBack.Users;
using Microsoft.AspNetCore.Mvc;


namespace InventoryEyeBack.Posts
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostsController : ControllerBase
    {
        // GET:ReadAllPosts api/<PostsController>
        [HttpGet]
        public IEnumerable<PostsModel> Get()
        {
            PostsModel post = new PostsModel();
            return post.ReadAllPosts();
        }

        // GET: Read Posts by postId api/<PostsController>/5
        [HttpGet("{id}")]
        public PostsModel Get(int id)
        {
            PostsModel post = new PostsModel();
            return post.ReadPostByPostId(id);
        }


        // GET: Read Posts by category api/<PostsController>/5
        [HttpGet("category/{category}")]
        public List<PostsModel> GetByCategory(int category)
        {
            PostsModel post = new PostsModel();
            return post.ReadPostByCategory(category);
        }

        // GET: Read Posts by userId api/<PostsController>/5
        [HttpGet("userId/{userId}")]
        public List<PostsModel> GetByUserId(int userId)
        {
            PostsModel post = new PostsModel();
            return post.ReadPostByUserId(userId);
        }

        // POST api/<PostsController>
        [HttpPost]
        public IActionResult Post([FromBody] PostsModel post)
        {
            int status = post.InsertPost(post);
            if (status == 1)
            {
                return Ok();
            }
            else
            {
                return BadRequest();
            }

        }

        // PUT api/<PostsController>/5
        [HttpPut("{id}")]
        public IActionResult Put([FromBody] PostsModel post)
        {
            int status = post.UpdatePost(post);
            if (status == 1)
            {
                return Ok(post);
            }
            else
            {
                return BadRequest();
            }
        }

        // DELETE api/<PostsController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            PostsModel post = new PostsModel();
            post.DeletePostDBS(id);
            return Ok();
        }
    }
}
