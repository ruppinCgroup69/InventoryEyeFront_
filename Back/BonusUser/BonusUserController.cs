using InventoryEyeBack.Bonus;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace InventoryEyeBack.BonusUser
{
    [Route("api/[controller]")]
    [ApiController]
    public class BonusUserController : ControllerBase
    {
        // POST api/<BonusUserController>
        [HttpPost]
        public IActionResult Post([FromBody] BonusUserModel bonusUser)
        {
            int status = bonusUser.InsertBonusUser(bonusUser);
            if (status == 1)
            {
                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }
    }
}
