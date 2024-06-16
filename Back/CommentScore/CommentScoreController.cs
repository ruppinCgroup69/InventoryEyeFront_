using InventoryEyeBack.Comments;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace InventoryEyeBack.CommentScore
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentScoreController : ControllerBase
    {

        // GET: Read Comment Score By Comment Id api/<CommentScoreController>/5
        [HttpGet("{commentId}")]
        public CommentScoreModel Get(int commentId)
        {
            CommentScoreModel commentScore = new CommentScoreModel();
            return commentScore.ReadCommentScoreByCommentId(commentId);
        }

        // GET: Read Comment Score By Published User Id api/<CommentScoreController>/5
        [HttpGet("PublishedBy/{publishedBy}")]
        public CommentScoreModel GetByPublishedUserId(int publishedBy)
        {
            CommentScoreModel commentScore = new CommentScoreModel();
            return commentScore.ReadCommentScoreByPublishedUserId(publishedBy);
        }

        // GET: Read Comment Score By Published User Id api/<CommentScoreController>/5
        [HttpGet("RatedBy/{ratedBy}")]
        public CommentScoreModel GetByRatdedByUserId(int ratedBy)
        {
            CommentScoreModel commentScore = new CommentScoreModel();
            return commentScore.ReadCommentScoreByRatedUserId(ratedBy);
        }

        // POST api/<CommentsController>
        [HttpPost]
        public IActionResult Post([FromBody] CommentScoreModel commentScore)
        {
            int status = commentScore.InsertCommentScore(commentScore);
            if (status == 1)
            {
                return Ok(commentScore);
            }
            else
            {
                return BadRequest();
            }
        }

        // PUT api/<CommentScoreController>/5
        [HttpPut("{commentId}")]
        public IActionResult Put([FromBody] CommentScoreModel commentScore)
        {
            int status = commentScore.UpdateCommentScore(commentScore);
            if (status == 1)
            {
                return Ok(commentScore);
            }
            else
            {
                return BadRequest();
            }
        }

        // DELETE api/<CommentScoreController>/5
        [HttpDelete("{commentId}/{ratedBy}")]
        public IActionResult Delete(int commentId, int ratedBy)
        {
            CommentScoreModel commentScore = new CommentScoreModel();
            commentScore.DeleteCommentScore(commentId, ratedBy);
            return Ok();
        }
    }
}
