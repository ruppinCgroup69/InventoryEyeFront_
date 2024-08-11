using InventoryEyeBack.Posts;
using InventoryEyeBack.Stores;
using System.Data;

namespace InventoryEyeBack.Survey
{
    public class SurveyModel
    {
        int userId;
        int favCategory;
        int favStore;

        public SurveyModel() { }
        public SurveyModel(int userId, int favCategory, int favStore)
        {
            UserId = userId;
            FavCategory = favCategory;
            FavStore = favStore;
        }

        public int UserId { get => userId; set => userId = value; }
        public int FavCategory { get => favCategory; set => favCategory = value; }
        public int FavStore { get => favStore; set => favStore = value; }

        public List<SurveyModel> ReadAllSurvey(int userId)
        {
            SurveyDBS dbs = new SurveyDBS();
            return dbs.ReadAllSurveyDBS(userId);
        }

        public int InsertSurvey(SurveyModel survey)
        {
            SurveyDBS dbs = new SurveyDBS();
            return dbs.InsertSurveyDBS(survey);
        }
        public int Updatesurvey(SurveyModel survey)
        {
            SurveyDBS dbs = new SurveyDBS();
            return dbs.UpdateSurveyDBS(survey);
        }
        public bool DeleteSurvey(int userId, int? favCategory = null, int? favStore = null)
        {
            SurveyDBS dbs = new SurveyDBS();
            return dbs.DeleteSurveyDBS(userId, favCategory, favStore);
        }

    }
}
