using InventoryEyeBack.Posts;
using InventoryEyeBack.Users;
using Microsoft.Data.SqlClient;
using System.Data;

namespace InventoryEyeBack.Category
{
    public class CategoriesDBS
    {
        public CategoriesDBS() { }
        public SqlConnection connect(String conString)
        {
            // read the connection string from the configuration file
            IConfigurationRoot configuration = new ConfigurationBuilder()
            .AddJsonFile("appsettings.json").Build();
            string cStr = configuration.GetConnectionString("MySqlConnectionString");
            SqlConnection con = new SqlConnection(cStr);
            con.Open();
            return con;
        }


        //-------------Insert Category-------------//
        public int InsertCategoryDBS(CategoriesModel category)
        {
            SqlConnection con;
            SqlCommand cmd;

            try
            {
                con = connect("MySqlConnectionString"); // create the connection
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            cmd = CreateInsertCategoryWithStoredProcedure("SP_InEye_InsertCategory", con, category); // create the command

            try
            {
                // 0 - failure, 1 - success
                cmd.ExecuteScalar(); // execute the command
                return 1;
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            finally
            {
                if (con != null)
                {
                    // close the db connection
                    con.Close();
                }
            }
        }


        private SqlCommand CreateInsertCategoryWithStoredProcedure(String spName, SqlConnection con, CategoriesModel category)
        {

            SqlCommand cmd = new SqlCommand(); // create the command object

            cmd.Connection = con;              // assign the connection to the command object

            cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

            cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

            cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

            cmd.Parameters.AddWithValue("@categoryDesc", category.CategoryDesc);

            return cmd;
        }


        //-------------Update Category-------------//
        public int UpdateCategoryDBS(CategoriesModel category)
        {
            SqlConnection con;
            SqlCommand cmd;

            try
            {
                con = connect("MySqlConnectionString"); // create the connection
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            cmd = CreateUpdateCategoryWithStoredProcedure("SP_InEye_UpdateCategory", con, category); // create the command

            try
            {
                // 0 - failure, 1 - success
                cmd.ExecuteScalar(); // execute the command
                return 1;
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            finally
            {
                if (con != null)
                {
                    // close the db connection
                    con.Close();
                }
            }
        }


        private SqlCommand CreateUpdateCategoryWithStoredProcedure(String spName, SqlConnection con, CategoriesModel category)
        {

            SqlCommand cmd = new SqlCommand(); // create the command object

            cmd.Connection = con;              // assign the connection to the command object

            cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

            cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

            cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

            cmd.Parameters.AddWithValue("@id", category.CategoryId);
            cmd.Parameters.AddWithValue("@categoryDesc", category.CategoryDesc);
            cmd.Parameters.AddWithValue("@categoryImage", category.CategoryImage);

            return cmd;
        }


        //-------------Delete Category-------------//
        public int DeleteCategoryDBS(int categoryId)
        {

            SqlConnection con;
            SqlCommand cmd;

            try
            {
                con = connect("MySqlConnectionString"); // create the connection
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            cmd = CreateDeleteCategoryWithStoredProcedure("SP_InEye_DeleteCategory", con, categoryId); // create the command

            try
            {
                int numEffected = cmd.ExecuteNonQuery(); // execute the command
                return numEffected;
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            finally
            {
                if (con != null)
                {
                    // close the db connection
                    con.Close();
                }
            }



        }

        private SqlCommand CreateDeleteCategoryWithStoredProcedure(String spName, SqlConnection con, int categoryId)
        {

            SqlCommand cmd = new SqlCommand(); // create the command object

            cmd.Connection = con;              // assign the connection to the command object

            cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

            cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

            cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

            cmd.Parameters.AddWithValue("@id", categoryId);


            return cmd;
        }

        //-------------Read all Categories -------------//
        public List<CategoriesModel> ReadCategoriesDBS()
        {

            SqlConnection con;
            SqlCommand cmd;

            try
            {
                con = connect("MySqlConnectionString"); // create the connection
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            // creat users list
            List<CategoriesModel> categories = new List<CategoriesModel>();

            // create a Command with the connection to use, name of stored procedure and its parameters
            cmd = buildReadAllCategoriesStoredProcedureCommand(con, "SP_InEye_ReadAllCategories");

            // call the stored procedure (using the cmd) and get results to DataReader
            SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

            // iterate over the results, next moves to the next record
            while (dataReader.Read())
            {
                CategoriesModel c = new CategoriesModel();
                c.CategoryId = Convert.ToInt32(dataReader["Id"].ToString());
                c.CategoryDesc = dataReader["CategoryDesc"].ToString();
                c.CategoryImage= dataReader["CategoryImage"].ToString();

                categories.Add(c);
            }

            if (con != null)
            {
                // close the db connection
                con.Close();
            }

            return categories;
        }
        private SqlCommand buildReadAllCategoriesStoredProcedureCommand(SqlConnection con, String spName)
        {

            SqlCommand cmd = new SqlCommand(); // create the command object

            cmd.Connection = con;              // assign the connection to the command object

            cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

            cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

            cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

            return cmd;
        }
    }
}
