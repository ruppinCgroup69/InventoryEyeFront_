using InventoryEyeBack.CommentScore;
using InventoryEyeBack.Users;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace InventoryEyeBack.StoreCategories
{
    [Route("api/[controller]")]
    [ApiController]
    public class StoreCategoriesController : ControllerBase
    {
        // GET: Read all store categories api/<StoreCategoriesController>/5
        [HttpGet]
        public IEnumerable<StoreCategoriesModel> Get()
        {
            StoreCategoriesModel storeCategories = new StoreCategoriesModel();
            return storeCategories.ReadAllStoreCategories();
        }
        // GET: Read store categories by category id api/<StoreCategoriesController>/5
        [HttpGet("CategoryId/{categoryId}")]
        public List<StoreCategoriesModel> Get(int categoryId)
        {
            StoreCategoriesModel storeCategories = new StoreCategoriesModel();
            return storeCategories.ReadStoreCategoriesByCategory(categoryId);
        }

        // GET store categories by store id api/<UsersController>/5
        [HttpGet("StoreId/{storeId}")]
        public StoreCategoriesModel GetStoreCategoriesByStoreId(int storeId)
        {
            StoreCategoriesModel storeCategories = new StoreCategoriesModel();
            return storeCategories.ReadStoreCategoriesByStoreId(storeId);
        }

        // POST api/<StoreCategoriesController>
        [HttpPost]
        public IActionResult Post([FromBody] StoreCategoriesModel storeCategories)
        {
            int status = storeCategories.InsertstoreCategories(storeCategories);
            if (status == 1)
            {
                return Ok(storeCategories);
            }
            else
            {
                return BadRequest();
            }
        }

        // PUT api/<StoreCategoriesController>/5
        [HttpPut("{storeId}/{categoryId}")]
        public IActionResult Put([FromBody] StoreCategoriesModel storeCategories)
        {
            int status = storeCategories.UpdatestoreCategories(storeCategories);
            if (status == 1)
            {
                return Ok(storeCategories);
            }
            else
            {
                return BadRequest();

            }
        }
        // DELETE api/<StoreCategoriesController>/5
        [HttpDelete("{storeId}/{categoryId}")]
        public IActionResult Delete(int storeId, int categoryId)
        {
            StoreCategoriesModel storeCategories = new StoreCategoriesModel();
            storeCategories.DeletestoreCategories(storeId, categoryId);
            return Ok();
        }
    }
}
