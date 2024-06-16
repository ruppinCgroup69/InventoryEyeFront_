
using InventoryEyeBack.CommentScore;
using InventoryEyeBack.Users;

namespace InventoryEyeBack.Weights
{
    public class WeightsModel
    {
        int generalWeight;
        int boughtWeight;
        int credibilityWeight;

        public WeightsModel() { }
        public WeightsModel(int generalWeight, int boughtWeight, int credibilityWeight)
        {
            GeneralWeight = generalWeight;
            BoughtWeight = boughtWeight;
            CredibilityWeight = credibilityWeight;
        }
        public int GeneralWeight { get => generalWeight; set => generalWeight = value; }
        public int BoughtWeight { get => boughtWeight; set => boughtWeight = value; }
        public int CredibilityWeight { get => credibilityWeight; set => credibilityWeight = value; }
         public List<WeightsModel> ReadWeights()
         {
            WeightsDBS dbs = new WeightsDBS();
            return dbs.ReadAllWeightsDBS();
        }
        public  int UpdateWeight(WeightsModel weights)
        {
            WeightsDBS dbs = new WeightsDBS();
            return dbs.UpdateWeightsDBS(weights);
        }

    }
}
