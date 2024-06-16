

using InventoryEyeBack.Posts;

namespace InventoryEyeBack.StockLevel
{
    public class StockLevelModel
    {

        int stockId;
        string stockDesc;


        public StockLevelModel(int stockId, string stockDesc)
        {
            StockId = stockId;
            StockDesc = stockDesc;
        }

        public StockLevelModel() { }

        public int StockId { get => stockId; set => stockId = value; }
        public string StockDesc { get => stockDesc; set => stockDesc = value; }


        public int InsertStockLevel(StockLevelModel stock)
        {
            StockLevelDBS dbs = new StockLevelDBS();
            return dbs.InsertStockLevelDBS(stock);
        }

        public int UpdateStockLevel(StockLevelModel stock)
        {
            StockLevelDBS dbs = new StockLevelDBS();
            return dbs.UpdateStockLevelDBS(stock);
        }

    }
}
