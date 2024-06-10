using Microsoft.AspNetCore.Mvc;

namespace InventoryEyeBack.Users
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        // GET: api/<UsersController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<UsersController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {

            return "value";
        }

        // POST Insert User>
        [HttpPost]
        public IActionResult Post([FromBody] UsersRegisterModel user)
        {
            int status = user.InsertUser(user);
                if (status == 1)
                {
                    return Ok();
                }
                else
                {
                    return BadRequest();
                }
        }

        // PUT api/<UsersController>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] UsersModel user)
        {
            int status = user.UpdateUser();
            if (status == 1)
            {
                return Ok(user);
            }
            else
            {
                return BadRequest();
            }
        }

        // DELETE api/<UsersController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
