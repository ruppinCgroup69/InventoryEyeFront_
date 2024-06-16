using InventoryEyeBack.Posts;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace InventoryEyeBack.StockLevel
{
    [Route("api/[controller]")]
    [ApiController]
    public class StockLevelController : ControllerBase
    {
        // GET: api/<StockLevelController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<StockLevelController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<StockLevelController>
        [HttpPost]
        public IActionResult Post([FromBody] StockLevelModel stock)
        {
            int status = stock.InsertStockLevel(stock);
            if (status == 1)
            {
                return Ok();
            }
            else
            {
                return BadRequest();
            }

        }

        // PUT api/<StockLevelController>/5
        [HttpPut("{id}")]
        public IActionResult Put([FromBody] StockLevelModel stock)
        {
            int status = stock.UpdateStockLevel(stock);
            if (status == 1)
            {
                return Ok(stock);
            }
            else
            {
                return BadRequest();
            }
        }

        // DELETE api/<StockLevelController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
           
        }
    }
}
