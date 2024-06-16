
using InventoryEyeBack.Comments;

namespace InventoryEyeBack.CommentScore
{
    public class CommentScoreModel
    {
        int commentId;
        int publishedBy;
        int ratedBy;
        int generalScore;
        int credability;
        bool bought;
        string content;

        public CommentScoreModel() { }

        public CommentScoreModel(int commentId, int publishedBy, int ratedBy, int generalScore, int credability, bool bought, string content)
        {
            CommentId = commentId;
            PublishedBy = publishedBy;
            RatedBy = ratedBy;
            GeneralScore = generalScore;
            Credability = credability;
            Bought = bought;
            Content = content;
        }

        public int CommentId { get => commentId; set => commentId = value; }
        public int PublishedBy { get => publishedBy; set => publishedBy = value; }
        public int RatedBy { get => ratedBy; set => ratedBy = value; }
        public int GeneralScore { get => generalScore; set => generalScore = value; }
        public int Credability { get => credability; set => credability = value; }
        public bool Bought { get => bought; set => bought = value; }
        public string Content { get => content; set => content = value; }

        public int InsertCommentScore(CommentScoreModel commentScore)
        {
            CommentScoreDBS dbs = new CommentScoreDBS();
            return dbs.InsertCommentScoreDBS(commentScore);
        }
        public int UpdateCommentScore(CommentScoreModel commentScore)
        {
            CommentScoreDBS dbs = new CommentScoreDBS();
            return dbs.UpdateCommentScoreDBS(commentScore);
        }
        public int DeleteCommentScore(int commentId, int ratedBy)
        {
            CommentScoreDBS dbs = new CommentScoreDBS();
            return dbs.DeleteCommentScoreDBS(commentId, ratedBy);
        }
        public CommentScoreModel ReadCommentScoreByCommentId(int commentId)
        {
            CommentScoreDBS dbs = new CommentScoreDBS();
            return dbs.ReadCommentScoreByCommentIdByCommentIdDBS(commentId);
        }
        public CommentScoreModel ReadCommentScoreByPublishedUserId(int publishedBy)
        {
            CommentScoreDBS dbs = new CommentScoreDBS();
            return dbs.ReadCommentScoreByPublishedUserIdDBS(publishedBy);
        }
        public CommentScoreModel ReadCommentScoreByRatedUserId(int ratedBy)
        {
            CommentScoreDBS dbs = new CommentScoreDBS();
            return dbs.ReadCommentScoreByRatedUserIdDBS(ratedBy);
        }

    }  
}
