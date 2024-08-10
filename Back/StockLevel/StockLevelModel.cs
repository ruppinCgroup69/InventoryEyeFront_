

using InventoryEyeBack.Posts;
using InventoryEyeBack.Stores;

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

        public List<StockLevelModel> ReadAllStockLevel()
        {
            StockLevelDBS dbs = new StockLevelDBS();
            return dbs.ReadAllStockLevelDBS();
        }
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

        public int DeleteStockLevel(int id)
        {
            StockLevelDBS dbs = new StockLevelDBS();
            return dbs.DeleteStockLevelDBS(id);
        }

    }
}
