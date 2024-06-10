using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace InventoryEyeBack.Weights
{
    [Route("api/[controller]")]
    [ApiController]
    public class WeightsController : ControllerBase
    {
        // GET: api/<WeightsController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<WeightsController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<WeightsController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<WeightsController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<WeightsController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
