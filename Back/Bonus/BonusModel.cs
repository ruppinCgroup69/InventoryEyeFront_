using InventoryEyeBack.Posts;
using InventoryEyeBack.Users;
using System.Globalization;

namespace InventoryEyeBack.Bonus
{
    public class BonusModel
    {
        int bonusId;
        int userId;
        string userName;
        string userImage;
        DateTime createAt;
        DateTime editedAt;
        string name;
        string description;
        string image;
        int minScore;
        int category;
        int numDownloads;

        public BonusModel() { }

        public BonusModel(int bonusId, int userId, string userName, string userImage, DateTime createAt, DateTime editedAt, string name, string description, string image, int category, int minScore, int numDownloads)
        {
            BonusId = bonusId;
            UserId = userId;
            UserName = userName;
            UserImage = userImage;
            CreateAt = createAt;
            EditedAt = editedAt;
            Name = name;
            Description = description;
            Image = image;
            Category = category;
            MinScore = minScore;
            NumDownloads = numDownloads;
        }
        public int BonusId { get => bonusId; set => bonusId = value; }
        public int UserId { get => userId; set => userId = value; }
        public string UserName { get => userName; set => userName = value; }
        public string UserImage { get => userImage; set => userImage = value; }
        public DateTime CreateAt { get => createAt; set => createAt = value; }
        public DateTime EditedAt { get => editedAt; set => editedAt = value; }
        public string Name { get => name; set => name = value; }
        public string Description { get => description; set => description = value; }
        public string Image { get => image; set => image = value; }
        public int Category { get => category; set => category = value; }
        public int MinScore { get => minScore; set => minScore = value; }
        public int NumDownloads { get => numDownloads; set => numDownloads = value; }

        public List<BonusModel> ReadAllBonus()
        {
            BonusDBS dbs = new BonusDBS();
            return dbs.ReadAllBonusDBS();
        }
        public int InsertBonus(BonusModel bonus)
        {
            BonusDBS dbs = new BonusDBS();
            return dbs.InsertBonusDBS(bonus);
        }
        public  int UpdateBonus(BonusModel bonus)
        {
            BonusDBS dbs = new BonusDBS();
            return dbs.UpdateBonusDBS(bonus);
        }
        public int DeleteBonus(int bonusId)
        {
            BonusDBS dbs = new BonusDBS();
            return dbs.DeleteBonusDBS(bonusId);
        }
        public List<BonusModel> ReadBonusByCategory(int category)
        {
            BonusDBS dbs = new BonusDBS();
            return dbs.ReadBonusByCategoryDBS(category);
        }
        public BonusModel ReadBonustByBonusId(int id)
        {
            BonusDBS dbs = new BonusDBS();
            return dbs.ReadBonustByBonusIdDBS(id);
        }

        public List<BonusModel> ReadBonusByUserId(int userId)
        {
            BonusDBS dbs = new BonusDBS();
            return dbs.ReadBonusByUserIdDBS(userId);
        }

        public List<BonusModel> ReadBonusByMinScore(int minScore)
        {
            BonusDBS dbs = new BonusDBS();
            return dbs.ReadBonusByMinScoreIdDBS(minScore);
        }
    }
}
