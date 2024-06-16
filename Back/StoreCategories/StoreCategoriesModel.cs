
using InventoryEyeBack.CommentScore;
using InventoryEyeBack.Users;

namespace InventoryEyeBack.StoreCategories
{
    public class StoreCategoriesModel
    {
        int storeId;
        int categoryId;
        bool isActive;
        string storeName;
        string categoryDesc;

        public StoreCategoriesModel() { }
        public StoreCategoriesModel(int storeId, int categoryId, bool isActive)
        {
            StoreId = storeId;
            CategoryId = categoryId;
            IsActive = isActive;
        }
        public int StoreId { get => storeId; set => storeId = value; }
        public int CategoryId { get => categoryId; set => categoryId = value; }
        public bool IsActive { get => isActive; set => isActive = value; }
        public string StoreName { get => storeName; set => storeName = value; }
        public string CategoryDesc { get => categoryDesc; set => categoryDesc = value; }

        public int InsertstoreCategories(StoreCategoriesModel storeCategories)
        {
            StoreCategoriesDBS dbs = new StoreCategoriesDBS();
            return dbs.InsertstoreCategoriesDBS(storeCategories);
        }
        public int UpdatestoreCategories(StoreCategoriesModel storeCategories)
        {
            StoreCategoriesDBS dbs = new StoreCategoriesDBS(); 
            return dbs.UpdatestoreCategoriesDBS(storeCategories);
        }
        public int DeletestoreCategories(int storeId, int categoryId)
        {
            StoreCategoriesDBS dbs = new StoreCategoriesDBS();
            return dbs.DeletestoreCategoriesDBS(storeId, categoryId);
        }
        public List<StoreCategoriesModel> ReadAllStoreCategories()
        {
            StoreCategoriesDBS dbs = new StoreCategoriesDBS();
            return dbs.ReadAllStoreCategoriesDBS();
        }
        public List<StoreCategoriesModel> ReadStoreCategoriesByCategory(int categoryId)
        {
            StoreCategoriesDBS dbs = new StoreCategoriesDBS();
            return dbs.ReadStoreCategoriesByCategoryDBS(categoryId);
        }
        public StoreCategoriesModel ReadStoreCategoriesByStoreId(int storeId)
        {
            StoreCategoriesDBS dbs = new StoreCategoriesDBS();
            return dbs.ReadStoreCategoriesByStoreIdDBS(storeId);
        }
    }
}
