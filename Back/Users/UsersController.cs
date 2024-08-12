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
        public IActionResult Put([FromBody] UserUpdateModel user)
        {
            UsersModel usersModel = new UsersModel();
            int status = usersModel.UpdateUser(user);
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
        [HttpPut("/api/Users/UpdateEmail/{id}")]
        public IActionResult PutEmail([FromBody] UserUpdateModel user)
        {
            UsersModel usersModel = new UsersModel();
            int status = usersModel.UpdateUserEmail(user.Id, user.EmailAddress);
            if (status == 1)
            {
                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }

        //PUT Update user password api/<UsersController>/5
        [HttpPut("/api/Users/UpdatePassword")]
        public IActionResult PutPassword([FromBody] UsersModel user)
        {
            int status = user.UpdateUserPassword();
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
            bool result = user.DeleteUser(email);
            if (result ==true)
            {
                return Ok("User and all associated data deleted successfully");
            }
            else
            {
                return NotFound("User not found or no data was deleted");
            }
        }
    }
}
