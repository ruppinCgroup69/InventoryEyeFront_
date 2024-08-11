using InventoryEyeBack.Posts;
using InventoryEyeBack.Stores;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace InventoryEyeBack.Survey
{
    [Route("api/[controller]")]
    [ApiController]
    public class SurveyController : ControllerBase
    {
        // GET: api/<SurveyController>
        [HttpGet("{userId}")]
        public IEnumerable<SurveyModel> Get(int userId)
        {
            SurveyModel post = new SurveyModel();
            return post.ReadAllSurvey(userId);
        }

        // POST api/<SurveyController>
        [HttpPost]
        public IActionResult Post([FromBody] SurveyModel survey)
        {
            int status = survey.InsertSurvey(survey);
            if (status == 1)
            {
                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }

        // PUT api/<SurveyController>/
        [HttpPut("{id}")]
        public IActionResult Put([FromBody] SurveyModel survey)
        {
            int status = survey.Updatesurvey(survey);
            if (status == 1)
            {
                return Ok(survey);
            }
            else
            {
                return BadRequest();
            }
        }

        // DELETE api/<SurveyController>/
        [HttpDelete("{userId}")]
        public IActionResult Delete(int userId, [FromQuery] int? favCategory = null, [FromQuery] int? favStore = null)
        {
            SurveyModel survey = new SurveyModel();
            bool result = survey.DeleteSurvey(userId, favCategory, favStore);

            if (result ==true)
            {
                return Ok();
            }
            else
            {
                return NotFound(); // or BadRequest, depending on your use case
            }
        }

    }
}
