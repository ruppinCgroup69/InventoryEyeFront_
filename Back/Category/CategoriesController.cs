using InventoryEyeBack.Posts;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace InventoryEyeBack.Category
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        // GET: api/<CategoriesController>
        [HttpGet]
        public IEnumerable<CategoriesModel> Get()
        {
            CategoriesModel category = new CategoriesModel();
            return category.ReadCategories();
        }

        // GET api/<CategoriesController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<CategoriesController>
        [HttpPost]
        public IActionResult Post([FromBody] CategoriesModel category)
        {
            int status = category.InsertCategory(category);
            if (status == 1)
            {
                return Ok(category);
            }
            else
            {
                return BadRequest();
            }

        }

        // PUT api/<CategoriesController>/5
        [HttpPut("{id}")]
        public IActionResult Put([FromBody] CategoriesModel category)
        {
            int status = category.UpdateCategory(category);
            if (status == 1)
            {
                return Ok(category);
            }
            else
            {
                return BadRequest();
            }
        }

        // DELETE api/<CategoriesController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            CategoriesModel category = new CategoriesModel();
            category.DeleteCategory(id);
            return Ok();
        }
    }
}
