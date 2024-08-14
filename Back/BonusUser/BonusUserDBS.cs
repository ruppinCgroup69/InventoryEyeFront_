
using InventoryEyeBack.Bonus;
using Microsoft.Data.SqlClient;

namespace InventoryEyeBack.BonusUser
{
    public class BonusUserDBS
    {
        public BonusUserDBS() { }
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
        //-------------Insert Bonus User-------------//
        public int InsertBonusUserDBS(BonusUserModel bonusUser)
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

            cmd = CreateInsertBonusUserWithStoredProcedure("SP_InEye_InsertUserBonus", con, bonusUser); // create the command

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
        private SqlCommand CreateInsertBonusUserWithStoredProcedure(String spName, SqlConnection con, BonusUserModel bonusUser)
        {

            SqlCommand cmd = new SqlCommand(); // create the command object

            cmd.Connection = con;              // assign the connection to the command object

            cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

            cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

            cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

            cmd.Parameters.AddWithValue("@bonusId", bonusUser.BonusId);
            cmd.Parameters.AddWithValue("@userId", bonusUser.UserId);
            cmd.Parameters.AddWithValue("@createAt", DateTime.Now);
            return cmd;
        }
    }
}
