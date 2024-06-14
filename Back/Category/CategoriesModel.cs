
using InventoryEyeBack.Posts;

namespace InventoryEyeBack.Category
{
    public class CategoriesModel
    {
        int categoryId;
        string categoryDesc;

        public CategoriesModel(int categoryId, string categoryDesc)
        {
            CategoryId = categoryId;
            CategoryDesc = categoryDesc;
        }

        public CategoriesModel() { }

        public int CategoryId { get => categoryId; set => categoryId = value; }
        public string CategoryDesc { get => categoryDesc; set => categoryDesc = value; }

        public int InsertCategory(CategoriesModel category)
        {
            CategoriesDBS dbs = new CategoriesDBS();
            return dbs.InsertCategoryDBS(category);
        }


        public int UpdateCategory(CategoriesModel category)
        {
            CategoriesDBS dbs = new CategoriesDBS();
            return dbs.UpdateCategoryDBS(category);
        }


        public int DeleteCategory(int categoryId)
        {
            CategoriesDBS dbs = new CategoriesDBS();
            return dbs.DeleteCategoryDBS(categoryId);

        }

        public List<CategoriesModel> ReadCategories()
        {
            CategoriesDBS dbs = new CategoriesDBS();
            return dbs.ReadCategoriesDBS();
        }
    }
}
