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
        [HttpGet("Category/{category}")]
        public List<PostsModel> GetByCategory(int category)
        {
            PostsModel post = new PostsModel();
            return post.ReadPostByCategory(category);
        }

        // GET: Read Posts by userId api/<PostsController>/5
        [HttpGet("UserId/{userId}")]
        public List<PostsModel> GetByUserId(int userId)
        {
            PostsModel post = new PostsModel();
            return post.ReadPostByUserId(userId);
        }

        // GET: Search Posts by fullName api/<PostsController>/5
        [HttpGet("FullName/{fullName}")] 
        public List<PostsModel> GetByFullName(string fullName) 
        { 
            PostsModel post = new PostsModel();
            return post.SearchPostsByFullName(fullName);

        }

        // GET: Search Posts by Content api/<PostsController>/5
        [HttpGet("Content/{content}")]
        public List<PostsModel> GetByContent(string content)
        {
            PostsModel post = new PostsModel();
            return post.SearchPostsByContent(content);
        }
        // GET: Search Posts by Content api/<PostsController>/5
        [HttpGet("Tags/{tags}")]
        public List<PostsModel> GetByTag(string tags)
        {
            PostsModel post = new PostsModel();
            return post.SearchPostsByTags(tags);
        }
          
        // GET: Search Posts by Product api/<PostsController>/5
        [HttpGet("Name/{name}")]
        public List<PostsModel> GetByProduct(string name)
        {
            PostsModel post = new PostsModel();
            return post.SearchPostsByProductName(name);
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
            post.DeletePost(id);
            return Ok();
        }
    }
}
