
using InventoryEyeBack.Posts;

namespace InventoryEyeBack.Category
{
    public class CategoriesModel
    {
        int categoryId;
        string categoryDesc;
        string categoryImage;
        public CategoriesModel(int categoryId, string categoryDesc, string categoryImage)
        {
            CategoryId = categoryId;
            CategoryDesc = categoryDesc;
            CategoryImage = categoryImage;
        }

        public CategoriesModel() { }

        public int CategoryId { get => categoryId; set => categoryId = value; }
        public string CategoryDesc { get => categoryDesc; set => categoryDesc = value; }

        public string CategoryImage { get => categoryImage; set => categoryImage = value; }

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
