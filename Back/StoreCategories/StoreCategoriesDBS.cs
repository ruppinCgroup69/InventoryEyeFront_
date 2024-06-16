
using InventoryEyeBack.CommentScore;
using InventoryEyeBack.Users;
using Microsoft.Data.SqlClient;
using System.Data;

namespace InventoryEyeBack.StoreCategories
{
    public class StoreCategoriesDBS
    {
        public StoreCategoriesDBS() { }
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

        //-------------Insert Store Categories-------------//
        public int InsertstoreCategoriesDBS(StoreCategoriesModel storeCategories)
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

            cmd = CreateInsertstoreCategoriesWithStoredProcedure("SP_InEye_InsertStoreCategories", con, storeCategories); // create the command

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
        private SqlCommand CreateInsertstoreCategoriesWithStoredProcedure(String spName, SqlConnection con, StoreCategoriesModel storeCategories)
        {

            SqlCommand cmd = new SqlCommand(); // create the command object

            cmd.Connection = con;              // assign the connection to the command object

            cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

            cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

            cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

            cmd.Parameters.AddWithValue("@storeId", storeCategories.StoreId);
            cmd.Parameters.AddWithValue("@categoryId", storeCategories.CategoryId);
            cmd.Parameters.AddWithValue("@isActive", storeCategories.IsActive);

            return cmd;
        }
        
        //-------------Update Store Categories-------------//
        public int UpdatestoreCategoriesDBS(StoreCategoriesModel storeCategories)
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

            cmd = CreateUpdatestoreCategoriesWithStoredProcedure("SP_InEye_UpdateStoreCategories", con, storeCategories); // create the command

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
        private SqlCommand CreateUpdatestoreCategoriesWithStoredProcedure(String spName, SqlConnection con, StoreCategoriesModel storeCategories)
        {

            SqlCommand cmd = new SqlCommand(); // create the command object

            cmd.Connection = con;              // assign the connection to the command object

            cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

            cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

            cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

            cmd.Parameters.AddWithValue("@storeId", storeCategories.StoreId);
            cmd.Parameters.AddWithValue("@categoryId", storeCategories.CategoryId);
            cmd.Parameters.AddWithValue("@isActive", storeCategories.IsActive);

            return cmd;
        }

        //-------------Delete Store Categories -------------//
        public int DeletestoreCategoriesDBS(int storeId, int categoryId)
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

            cmd = CreateDeleteStoreCategoriesWithStoredProcedure("SP_InEye_DeleteStoreCategories", con, storeId, categoryId); // create the command

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
        private SqlCommand CreateDeleteStoreCategoriesWithStoredProcedure(String spName, SqlConnection con, int storeId, int categoryId)
        {

            SqlCommand cmd = new SqlCommand(); // create the command object

            cmd.Connection = con;              // assign the connection to the command object

            cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

            cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

            cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

            cmd.Parameters.AddWithValue("@storeId", storeId);
            cmd.Parameters.AddWithValue("@categoryId", categoryId);

            return cmd;
        }

        //-------------Read all Store Categories -------------//
        public List<StoreCategoriesModel> ReadAllStoreCategoriesDBS()
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
            List<StoreCategoriesModel> storeCategories = new List<StoreCategoriesModel>();

            // create a Command with the connection to use, name of stored procedure and its parameters
            cmd = buildReadAllUsersStoredProcedureCommand(con, "SP_InEye_ReadAllStoreCategories");

            // call the stored procedure (using the cmd) and get results to DataReader
            SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

            // iterate over the results, next moves to the next record
            while (dataReader.Read())
            {
                StoreCategoriesModel sc = new StoreCategoriesModel();
                sc.StoreId = Convert.ToInt32(dataReader["StoreId"].ToString());
                sc.StoreName= dataReader["StoreName"].ToString();
                sc.CategoryId = Convert.ToInt32(dataReader["CategoryId"].ToString());
                sc.CategoryDesc = dataReader["CategoryDesc"].ToString();
                sc.IsActive = Convert.ToBoolean(dataReader["IsActive"]);
                storeCategories.Add(sc);
            }

            if (con != null)
            {
                // close the db connection
                con.Close();
            }

            return storeCategories;
        }
        private SqlCommand buildReadAllUsersStoredProcedureCommand(SqlConnection con, String spName)
        {

            SqlCommand cmd = new SqlCommand(); // create the command object

            cmd.Connection = con;              // assign the connection to the command object

            cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

            cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

            cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

            return cmd;
        }

        //-------------Read Store Categories by Category id -------------//
        public List<StoreCategoriesModel> ReadStoreCategoriesByCategoryDBS(int categoryId)
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

            List<StoreCategoriesModel> storeCategories = new List<StoreCategoriesModel>();

            // create a Command with the connection to use, name of stored procedure and its parameters
            cmd = buildReadStoreCategoriesByCategoryStoredProcedureCommand(con, "SP_InEye_ReadStoreCategoriesByCategory", categoryId);

            // call the stored procedure (using the cmd) and get results to DataReader
            SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

            while (dataReader.Read())
            {
                StoreCategoriesModel sc = new StoreCategoriesModel();
                sc.StoreId = Convert.ToInt32(dataReader["StoreId"].ToString());
                sc.StoreName = dataReader["StoreName"].ToString();
                sc.CategoryId = Convert.ToInt32(dataReader["CategoryId"].ToString());
                sc.CategoryDesc = dataReader["CategoryDesc"].ToString();
                sc.IsActive = Convert.ToBoolean(dataReader["IsActive"]);
                storeCategories.Add(sc);
            }
            if (con != null)
            {
                // close the db connection
                con.Close();
            }

            return storeCategories;
        }
        private SqlCommand buildReadStoreCategoriesByCategoryStoredProcedureCommand(SqlConnection con, String spName, int categoryId)
        {

            SqlCommand cmd = new SqlCommand(); // create the command object

            cmd.Connection = con;              // assign the connection to the command object

            cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

            cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

            cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

            cmd.Parameters.AddWithValue("@categoryId", categoryId);
            return cmd;
        }

        //-------------Read Store Categories by Store id -------------//
        public StoreCategoriesModel ReadStoreCategoriesByStoreIdDBS(int storeId)
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

            StoreCategoriesModel sc = new StoreCategoriesModel();
            // create a Command with the connection to use, name of stored procedure and its parameters
            cmd = buildReadStoreCategoriesByStoreIdStoredProcedureCommand(con, "SP_InEye_ReadStoreCategoriesByStoreId", storeId);

            // call the stored procedure (using the cmd) and get results to DataReader
            SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

            // iterate over the results, next moves to the next record
            while (dataReader.Read())
            {
                sc.StoreId = Convert.ToInt32(dataReader["StoreId"].ToString());
                sc.StoreName = dataReader["StoreName"].ToString();
                sc.CategoryId = Convert.ToInt32(dataReader["CategoryId"].ToString());
                sc.CategoryDesc = dataReader["CategoryDesc"].ToString();
                sc.IsActive = Convert.ToBoolean(dataReader["IsActive"]);
            }

            if (con != null)
            {
                // close the db connection
                con.Close();
            }

            return sc;
        }
        private SqlCommand buildReadStoreCategoriesByStoreIdStoredProcedureCommand(SqlConnection con, String spName, int storeId)
        {

            SqlCommand cmd = new SqlCommand(); // create the command object

            cmd.Connection = con;              // assign the connection to the command object

            cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

            cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

            cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

            cmd.Parameters.AddWithValue("@storeId", storeId);
            return cmd;
        }
    }
}
