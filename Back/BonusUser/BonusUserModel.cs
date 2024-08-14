using InventoryEyeBack.Bonus;
using static System.Net.Mime.MediaTypeNames;

namespace InventoryEyeBack.BonusUser
{
    public class BonusUserModel
    {
        int bonusId;
        int userId;
        DateTime createAt;

        public BonusUserModel() { }

        public BonusUserModel(int bonusId, int userId,  DateTime createAt)
        {
            BonusId = bonusId;
            UserId = userId;
            CreateAt = createAt;
        }
        public int BonusId { get => bonusId; set => bonusId = value; }
        public int UserId { get => userId; set => userId = value; }
        public DateTime CreateAt { get => createAt; set => createAt = value; }

        public int InsertBonusUser(BonusUserModel bonusUser)
        {
            BonusUserDBS dbs = new BonusUserDBS();
            return dbs.InsertBonusUserDBS(bonusUser);
        }

    }

}
