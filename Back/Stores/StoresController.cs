using InventoryEyeBack.Posts;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace InventoryEyeBack.Stores
{
    [Route("api/[controller]")]
    [ApiController]
    public class StoresController : ControllerBase
    {
        // GET: api/<StoresController>
        [HttpGet]
        public IEnumerable<StoreModel> Get()
        {
            StoreModel store = new StoreModel();
            return store.ReadAllStores();
        }

        // GET api/<StoresController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<StoresController>
        [HttpPost]
        public IActionResult Post([FromBody] StoreModel store)
        {
            int status = store.InsertStore(store);
            if (status == 1)
            {
                return Ok(store);
            }
            else
            {
                return BadRequest();
            }

        }

        // PUT api/<StoresController>/5
        [HttpPut("{id}")]
        public IActionResult Put([FromBody] StoreModel store)
        {
            int status = store.UpdateStore(store);
            if (status == 1)
            {
                return Ok(store);
            }
            else
            {
                return BadRequest();
            }
        }

        // DELETE api/<StoresController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            StoreModel store = new StoreModel();
            store.DeleteStore(id);
            return Ok();
        }
    }
}
