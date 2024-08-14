using InventoryEyeBack.Posts;
using InventoryEyeBack.Users;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace InventoryEyeBack.Bonus
{
    [Route("api/[controller]")]
    [ApiController]
    public class BonusController : ControllerBase
    {
        // GET: api/<BonusController>
        [HttpGet]
        public IEnumerable<BonusModel> Get()
        {
            BonusModel bonus = new BonusModel();
            return bonus.ReadAllBonus();
        }

        // GET: Read Bonus by bonusId api/<BonusController>/5
        [HttpGet("bonusId/{id}")]
        public BonusModel GetByBonusId(int id)
        {
            BonusModel bonus = new BonusModel();
            return bonus.ReadBonustByBonusId(id);
        }

        // GET: Read Bonus by category api/<BonusController>/5
        [HttpGet("Category/{category}")]
        public List<BonusModel> GetByCategory(int category)
        {
            BonusModel bonus = new BonusModel();
            return bonus.ReadBonusByCategory(category);
        }

        // GET: Read Bonus by userId api/<BonusController>/5
        [HttpGet("UserId/{userId}")]
        public List<BonusModel> GetByUserId(int userId)
        {
            BonusModel bonus = new BonusModel();
            return bonus.ReadBonusByUserId(userId);
        }

        // GET: Read Bonus Avilable api/<BonusController>/5
        [HttpGet("ClientAvilable/{clientAvilableId}")]
        public List<BonusModel> GetBonusAvilable(int clientAvilableId)
        {
            BonusModel bonus = new BonusModel();
            return bonus.ReadBonusAvilable(clientAvilableId);
        }

        // GET: Read Bonus Used api/<BonusController>/5
        [HttpGet("ClientUsed/{clientUsed}")]
        public List<BonusModel> GetBonusUsed(int clientUsed)
        {
            BonusModel bonus = new BonusModel();
            return bonus.ReadBonusUsed(clientUsed);
        }

        // GET: Read Bonus by minScore api/<BonusController>/5
        [HttpGet("MinScore/{minScore}")]
        public List<BonusModel> GetByMinScore(int minScore)
        {
            BonusModel bonus = new BonusModel();
            return bonus.ReadBonusByMinScore(minScore);
        }

        // POST api/<BonusController>
        [HttpPost]
        public IActionResult Post([FromBody] BonusModel bonus)
        {
            int status = bonus.InsertBonus(bonus);
            if (status == 1)
            {
                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }

        // PUT api/<BonusController>/5
        [HttpPut("{id}")]
        public IActionResult Put([FromBody] BonusModel bonus)
        {
            int status = bonus.UpdateBonus(bonus);
            if (status == 1)
            {
                return Ok(bonus);
            }
            else
            {
                return BadRequest();
            }
        }

        // DELETE api/<BonusController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            BonusModel bonus = new BonusModel();
            bonus.DeleteBonus(id);
            return Ok();
        }
    }
}
