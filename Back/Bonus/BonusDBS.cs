
using InventoryEyeBack.Posts;
using InventoryEyeBack.Users;
using Microsoft.Data.SqlClient;
using Microsoft.Identity.Client;
using System.Data;

namespace InventoryEyeBack.Bonus
{
    public class BonusDBS
    {
        public BonusDBS() { }
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

        //-------------Read all Bonus -------------//
        public List<BonusModel> ReadAllBonusDBS()
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
            List<BonusModel> bonus = new List<BonusModel>();

            // create a Command with the connection to use, name of stored procedure and its parameters
            cmd = buildReadAllBonusStoredProcedureCommand(con, "SP_InEye_ReadAllBonus");

            // call the stored procedure (using the cmd) and get results to DataReader
            SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

            // iterate over the results, next moves to the next record
            while (dataReader.Read())
            {
                BonusModel b = new BonusModel();
                b.BonusId = Convert.ToInt32(dataReader["BonusId"].ToString());
                b.UserId = Convert.ToInt32(dataReader["UserId"].ToString());
                b.UserName = dataReader["FullName"].ToString();
                b.UserImage = dataReader["UserImage"].ToString();
                b.CreateAt = Convert.ToDateTime(dataReader["CreateAt"].ToString());
                b.EditedAt = Convert.ToDateTime(dataReader["EditedAt"].ToString());
                b.Name = dataReader["Name"].ToString();
                b.Description = dataReader["Description"].ToString();
                b.Image = dataReader["Image"].ToString();
                b.MinScore = Convert.ToInt32(dataReader["MinScore"].ToString());
                b.NumDownloads = Convert.ToInt32(dataReader["NumDownloads"].ToString());
                b.Category = Convert.ToInt32(dataReader["Category"].ToString());

                bonus.Add(b);
            }

            if (con != null)
            {
                // close the db connection
                con.Close();
            }

            return bonus;
        }
        private SqlCommand buildReadAllBonusStoredProcedureCommand(SqlConnection con, String spName)
        {

            SqlCommand cmd = new SqlCommand(); // create the command object

            cmd.Connection = con;              // assign the connection to the command object

            cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

            cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

            cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

            return cmd;
        }

        //-------------Insert Bonus-------------//
        public int InsertBonusDBS(BonusModel bonus)
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

            cmd = CreateInsertBonusWithStoredProcedure("SP_InEye_InsertBonus", con, bonus); // create the command

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
        private SqlCommand CreateInsertBonusWithStoredProcedure(String spName, SqlConnection con, BonusModel bonus)
        {

            SqlCommand cmd = new SqlCommand(); // create the command object

            cmd.Connection = con;              // assign the connection to the command object

            cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

            cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

            cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

            cmd.Parameters.AddWithValue("@userId", bonus.UserId);
            cmd.Parameters.AddWithValue("@createAt", DateTime.Now);
            cmd.Parameters.AddWithValue("@editedAt", DateTime.Now);
            cmd.Parameters.AddWithValue("@name", bonus.Name);
            cmd.Parameters.AddWithValue("@description", bonus.Description);
            cmd.Parameters.AddWithValue("@image", bonus.Image);
            cmd.Parameters.AddWithValue("@minScore", bonus.MinScore);
            cmd.Parameters.AddWithValue("@category", bonus.Category);
            cmd.Parameters.AddWithValue("@numDownloads", bonus.NumDownloads);
            return cmd;
        }
        
        //-------------Update Bonus-------------//
        public int UpdateBonusDBS(BonusModel bonus)
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

            cmd = CreateUpdateBonusWithStoredProcedure("SP_InEye_UpdateBonus", con, bonus); // create the command

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
        private SqlCommand CreateUpdateBonusWithStoredProcedure(String spName, SqlConnection con, BonusModel bonus)
        {

            SqlCommand cmd = new SqlCommand(spName, con); // create the command object

            cmd.Connection = con;              // assign the connection to the command object

            cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

            cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

            cmd.CommandType = CommandType.StoredProcedure; ; // the type of the command, can also be text

            cmd.Parameters.AddWithValue("@bonusId", bonus.BonusId);
            cmd.Parameters.AddWithValue("@userId", bonus.UserId);
            cmd.Parameters.AddWithValue("@createAt", bonus.CreateAt);
            cmd.Parameters.AddWithValue("@editedAt", DateTime.Now); 
            cmd.Parameters.AddWithValue("@name", bonus.Name);
            cmd.Parameters.AddWithValue("@description", bonus.Description);
            cmd.Parameters.AddWithValue("@image", bonus.Image);
            cmd.Parameters.AddWithValue("@minScore", bonus.MinScore);
            cmd.Parameters.AddWithValue("@numDownloads", bonus.NumDownloads);
            cmd.Parameters.AddWithValue("@category", bonus.Category);

            return cmd;
        }

        //-------------Delete Bonus -------------//
        public int DeleteBonusDBS(int bonusId)
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

            cmd = CreateDeleteBonusWithStoredProcedure("SP_InEye_DeleteBonus", con, bonusId); // create the command

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
        private SqlCommand CreateDeleteBonusWithStoredProcedure(String spName, SqlConnection con, int bonusId)
        {

            SqlCommand cmd = new SqlCommand(); // create the command object

            cmd.Connection = con;              // assign the connection to the command object

            cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

            cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

            cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

            cmd.Parameters.AddWithValue("@id", bonusId);

            return cmd;
        }

        //-------------Read Bonus by category -------------//
        public List<BonusModel> ReadBonusByCategoryDBS(int category)
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
            List<BonusModel> bonus = new List<BonusModel>();

            // create a Command with the connection to use, name of stored procedure and its parameters
            cmd = buildReadBonusByCategoryStoredProcedureCommand(con, "SP_InEye_ReadBonusByCategory", category);

            // call the stored procedure (using the cmd) and get results to DataReader
            SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

            // iterate over the results, next moves to the next record
            while (dataReader.Read())
            {
                BonusModel b = new BonusModel();
                b.BonusId = Convert.ToInt32(dataReader["BonusId"].ToString());
                b.UserId = Convert.ToInt32(dataReader["UserId"].ToString());
                b.UserName = dataReader["FullName"].ToString();
                b.UserImage = dataReader["UserImage"].ToString();
                b.CreateAt = Convert.ToDateTime(dataReader["CreateAt"].ToString());
                b.EditedAt = Convert.ToDateTime(dataReader["EditedAt"].ToString());
                b.Name = dataReader["Name"].ToString();
                b.Description = dataReader["Description"].ToString();
                b.Image = dataReader["Image"].ToString();
                b.MinScore = Convert.ToInt32(dataReader["MinScore"].ToString());
                b.NumDownloads = Convert.ToInt32(dataReader["NumDownloads"].ToString());
                b.Category = Convert.ToInt32(dataReader["Category"].ToString());

                bonus.Add(b);


            }
            if (con != null)
            {
                // close the db connection
                con.Close();
            }

            return bonus;
        }
        private SqlCommand buildReadBonusByCategoryStoredProcedureCommand(SqlConnection con, String spName, int category)
        {

            SqlCommand cmd = new SqlCommand(); // create the command object

            cmd.Connection = con;              // assign the connection to the command object

            cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

            cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

            cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

            cmd.Parameters.AddWithValue("@category", category);
            return cmd;
        }
       
        //-------------Read Bonus by bonus id -------------//
        public BonusModel ReadBonustByBonusIdDBS(int id)
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


            BonusModel b = new BonusModel();

            // create a Command with the connection to use, name of stored procedure and its parameters
            cmd = buildReadBonusByIdStoredProcedureCommand(con, "SP_InEye_ReadBonusByBonusId", id);

            // call the stored procedure (using the cmd) and get results to DataReader
            SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

            // iterate over the results, next moves to the next record
            while (dataReader.Read())
            {

                b.BonusId = Convert.ToInt32(dataReader["BonusId"].ToString());
                b.UserId = Convert.ToInt32(dataReader["UserId"].ToString());
                b.UserName = dataReader["FullName"].ToString();
                b.UserImage = dataReader["UserImage"].ToString();
                b.CreateAt = Convert.ToDateTime(dataReader["CreateAt"].ToString());
                b.EditedAt = Convert.ToDateTime(dataReader["EditedAt"].ToString());
                b.Name = dataReader["Name"].ToString();
                b.Description = dataReader["Description"].ToString();
                b.Image = dataReader["Image"].ToString();
                b.MinScore = Convert.ToInt32(dataReader["MinScore"].ToString());
                b.NumDownloads = Convert.ToInt32(dataReader["NumDownloads"].ToString());
                b.Category = Convert.ToInt32(dataReader["Category"].ToString());


            }
            if (con != null)
            {
                // close the db connection
                con.Close();
            }

            return b;
        }
        private SqlCommand buildReadBonusByIdStoredProcedureCommand(SqlConnection con, String spName, int id)
        {

            SqlCommand cmd = new SqlCommand(); // create the command object

            cmd.Connection = con;              // assign the connection to the command object

            cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

            cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

            cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

            cmd.Parameters.AddWithValue("@bonusId", id);
            return cmd;
        }

        //-------------Read Bonus by userId -------------//
        public List<BonusModel> ReadBonusByUserIdDBS(int userId)
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
            List<BonusModel> bonus = new List<BonusModel>();

            // create a Command with the connection to use, name of stored procedure and its parameters
            cmd = buildReadBonusByUserIdStoredProcedureCommand(con, "SP_InEye_ReadBonusByUserId", userId);

            // call the stored procedure (using the cmd) and get results to DataReader
            SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

            // iterate over the results, next moves to the next record
            while (dataReader.Read())
            {
                BonusModel b = new BonusModel();
                b.BonusId = Convert.ToInt32(dataReader["BonusId"].ToString());
                b.UserId = Convert.ToInt32(dataReader["UserId"].ToString());
                b.UserName = dataReader["FullName"].ToString();
                b.UserImage = dataReader["UserImage"].ToString();
                b.CreateAt = Convert.ToDateTime(dataReader["CreateAt"].ToString());
                b.EditedAt = Convert.ToDateTime(dataReader["EditedAt"].ToString());
                b.Name = dataReader["Name"].ToString();
                b.Description = dataReader["Description"].ToString();
                b.Image = dataReader["Image"].ToString();
                b.MinScore = Convert.ToInt32(dataReader["MinScore"].ToString());
                b.NumDownloads = Convert.ToInt32(dataReader["NumDownloads"].ToString());
                b.Category = Convert.ToInt32(dataReader["Category"].ToString());

                bonus.Add(b);

            }
            if (con != null)
            {
                // close the db connection
                con.Close();
            }

            return bonus;
        }
        private SqlCommand buildReadBonusByUserIdStoredProcedureCommand(SqlConnection con, String spName, int userId)
        {

            SqlCommand cmd = new SqlCommand(); // create the command object

            cmd.Connection = con;              // assign the connection to the command object

            cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

            cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

            cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

            cmd.Parameters.AddWithValue("@userId", userId);
            return cmd;
        }

        //-------------Read Bonus by minScore -------------//
        public List<BonusModel> ReadBonusByMinScoreIdDBS(int minScore)
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
            List<BonusModel> bonus = new List<BonusModel>();

            // create a Command with the connection to use, name of stored procedure and its parameters
            cmd = buildReadBonusByMinScroeStoredProcedureCommand(con, "SP_InEye_ReadBonusByMinScore", minScore);

            // call the stored procedure (using the cmd) and get results to DataReader
            SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

            // iterate over the results, next moves to the next record
            while (dataReader.Read())
            {
                BonusModel b = new BonusModel();
                b.BonusId = Convert.ToInt32(dataReader["BonusId"].ToString());
                b.UserId = Convert.ToInt32(dataReader["UserId"].ToString());
                b.UserName = dataReader["FullName"].ToString();
                b.UserImage = dataReader["UserImage"].ToString();
                b.CreateAt = Convert.ToDateTime(dataReader["CreateAt"].ToString());
                b.EditedAt = Convert.ToDateTime(dataReader["EditedAt"].ToString());
                b.Name = dataReader["Name"].ToString();
                b.Description = dataReader["Description"].ToString();
                b.Image = dataReader["Image"].ToString();
                b.MinScore = Convert.ToInt32(dataReader["MinScore"].ToString());
                b.NumDownloads = Convert.ToInt32(dataReader["NumDownloads"].ToString());
                b.Category = Convert.ToInt32(dataReader["Category"].ToString());

                bonus.Add(b);

            }
            if (con != null)
            {
                // close the db connection
                con.Close();
            }

            return bonus;
        }
        private SqlCommand buildReadBonusByMinScroeStoredProcedureCommand(SqlConnection con, String spName, int minScore)
        {

            SqlCommand cmd = new SqlCommand(); // create the command object

            cmd.Connection = con;              // assign the connection to the command object

            cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

            cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

            cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

            cmd.Parameters.AddWithValue("@minScore", minScore);
            return cmd;
        }

        //-------------Read Avilable Bonus -------------//
        public List<BonusModel> ReadBonusAvilabledDBS(int clientAvilableId)
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
            List<BonusModel> bonus = new List<BonusModel>();

            // create a Command with the connection to use, name of stored procedure and its parameters
            cmd = buildReadAvilableBonusdStoredProcedureCommand(con, "SP_InEye_ReadAvilableBonusForUser", clientAvilableId);

            // call the stored procedure (using the cmd) and get results to DataReader
            SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

            // iterate over the results, next moves to the next record
            while (dataReader.Read())
            {
                BonusModel b = new BonusModel();
                b.BonusId = Convert.ToInt32(dataReader["BonusId"].ToString());
                b.UserId = Convert.ToInt32(dataReader["UserId"].ToString());
                b.UserName = dataReader["FullName"].ToString();
                b.UserImage = dataReader["UserImage"].ToString();
                b.CreateAt = Convert.ToDateTime(dataReader["CreateAt"].ToString());
                b.EditedAt = Convert.ToDateTime(dataReader["EditedAt"].ToString());
                b.Name = dataReader["Name"].ToString();
                b.Description = dataReader["Description"].ToString();
                b.Image = dataReader["Image"].ToString();
                b.MinScore = Convert.ToInt32(dataReader["MinScore"].ToString());
                b.NumDownloads = Convert.ToInt32(dataReader["NumDownloads"].ToString());
                b.Category = Convert.ToInt32(dataReader["Category"].ToString());

                bonus.Add(b);

            }
            if (con != null)
            {
                // close the db connection
                con.Close();
            }

            return bonus;
        }
        private SqlCommand buildReadAvilableBonusdStoredProcedureCommand(SqlConnection con, String spName, int clientAvilableId)
        {

            SqlCommand cmd = new SqlCommand(); // create the command object

            cmd.Connection = con;              // assign the connection to the command object

            cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

            cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

            cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

            cmd.Parameters.AddWithValue("@clientId", clientAvilableId);
            return cmd;
        }

        //-------------Read Used Bonus -------------//
        public List<BonusModel> ReadBonusUsedDBS(int clientUsed)
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
            List<BonusModel> bonus = new List<BonusModel>();

            // create a Command with the connection to use, name of stored procedure and its parameters
            cmd = buildReadUsedBonusdStoredProcedureCommand(con, "SP_InEye_ReadUsedBonusForUser", clientUsed);

            // call the stored procedure (using the cmd) and get results to DataReader
            SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

            // iterate over the results, next moves to the next record
            while (dataReader.Read())
            {
                BonusModel b = new BonusModel();
                b.BonusId = Convert.ToInt32(dataReader["BonusId"].ToString());
                b.UserId = Convert.ToInt32(dataReader["UserId"].ToString());
                b.UserName = dataReader["FullName"].ToString();
                b.UserImage = dataReader["UserImage"].ToString();
                b.CreateAt = Convert.ToDateTime(dataReader["CreateAt"].ToString());
                b.EditedAt = Convert.ToDateTime(dataReader["EditedAt"].ToString());
                b.Name = dataReader["Name"].ToString();
                b.Description = dataReader["Description"].ToString();
                b.Image = dataReader["Image"].ToString();
                b.MinScore = Convert.ToInt32(dataReader["MinScore"].ToString());
                b.NumDownloads = Convert.ToInt32(dataReader["NumDownloads"].ToString());
                b.Category = Convert.ToInt32(dataReader["Category"].ToString());

                bonus.Add(b);

            }
            if (con != null)
            {
                // close the db connection
                con.Close();
            }

            return bonus;
        }
        private SqlCommand buildReadUsedBonusdStoredProcedureCommand(SqlConnection con, String spName, int clientUsed)
        {

            SqlCommand cmd = new SqlCommand(); // create the command object

            cmd.Connection = con;              // assign the connection to the command object

            cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

            cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

            cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

            cmd.Parameters.AddWithValue("@clientId", clientUsed);
            return cmd;
        }
    }
}
