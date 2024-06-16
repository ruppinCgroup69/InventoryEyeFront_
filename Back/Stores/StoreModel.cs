
using InventoryEyeBack.Posts;

namespace InventoryEyeBack.Stores
{
    public class StoreModel
    {
        int storeId;
        string storeName;

        public StoreModel(int storeId, string storeName)
        {
            StoreId = storeId;
            StoreName = storeName;
        }

        public StoreModel() { }

        public int StoreId { get => storeId; set => storeId = value; }
        public string StoreName { get => storeName; set => storeName = value; }

        public int InsertStore(StoreModel store)
        {
            StoresDBS dbs = new StoresDBS();
            return dbs.InsertStoreDBS(store);
        }

        public int UpdateStore(StoreModel store)
        {
            StoresDBS dbs = new StoresDBS();
            return dbs.UpdateStoreDBS(store);
        }


        public int DeleteStore(int id)
        {
            StoresDBS dbs = new StoresDBS();
            return dbs.DeleteStoreDBS(id);
        }

        public List<StoreModel> ReadAllStores()
        {
            StoresDBS dbs = new StoresDBS();
            return dbs.ReadAllStoresDBS();
        }
    }
}
