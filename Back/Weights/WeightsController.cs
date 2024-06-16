using InventoryEyeBack.CommentScore;
using InventoryEyeBack.Users;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace InventoryEyeBack.Weights
{
    [Route("api/[controller]")]
    [ApiController]
    public class WeightsController : ControllerBase
    {
        // GET: Read All Weights api/<WeightsController>
        [HttpGet]
        public IEnumerable<WeightsModel> Get()
        {
            WeightsModel weight = new WeightsModel();
            return weight.ReadWeights();
        }

        // PUT api/<WeightsController>/5
        [HttpPut]
        public IActionResult Put([FromBody] WeightsModel weights)
        {
            int status = weights.UpdateWeight(weights);
            if (status == 1)
            {
                return Ok(weights);
            }
            else
            {
                return BadRequest();
            }
        }

    }
}
