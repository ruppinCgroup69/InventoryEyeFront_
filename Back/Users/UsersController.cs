using Microsoft.AspNetCore.Mvc;

namespace InventoryEyeBack.Users
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        // GET all users api/<UsersController>/5
        [HttpGet]
        public IEnumerable<UsersModel> Get()
        {
            UsersModel user = new UsersModel();
            return user.Read();
        }

        // GET User by id api/<UsersController>/5
        [HttpGet("{id}")]
        public UsersModel Get(int id)
        {
            UsersModel user = new UsersModel();
            return user.ReadUserById(id);
        }

        // POST Insert User>
        [HttpPost]
        public IActionResult Post([FromBody] UsersModel user)
        {
            int status = user.InsertUser(user);
            if (status == 1)
            {
                return Ok("good");
            }
            else
            {
                return BadRequest("bad");
            }
        }

        // POST Login>
        [HttpPost("/api/Users/login")]
        public IActionResult PostLogin([FromBody] UsersModel user)
        {
            UserLoginModel u = user.LoginUser(user);
            if (u != null)
            {
                return Ok(u);
            }
            else
            {
                return BadRequest(u);
            }
        }

        // PUT Update user api/<UsersController>/5
        [HttpPut("{email}")]
        public IActionResult Put([FromBody] UsersModel user)
        {
            int status = user.UpdateUser(user);
            if (status == 1)
            {
                return Ok(user);
            }
            else
            {
                return BadRequest();
            }
        }

        //PUT Update user email api/<UsersController>/5
        [HttpPut]
        public IActionResult PutEmail([FromBody] UsersModel user)
        {
            int status = user.UpdateUserEmail();
            if (status == 1)
            {
                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }

        // DELETE api/<UsersController>/5
        [HttpDelete("{email}")]
        public IActionResult Delete(string email)
        {
            UsersModel user = new UsersModel();
            user.DeleteUser(email);
            return Ok();
        }
    }
}
