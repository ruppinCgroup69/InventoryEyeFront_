using Microsoft.Data.SqlClient;
using Microsoft.Identity.Client;
using System.Data;
using InventoryEyeBack.Users;

namespace InventoryEyeBack.Users
{
    public class UsersDBS
    {
        public UsersDBS() { }   
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
        //-------------Insert User-------------//
        public int InsertUserDBS(UsersRegisterModel user)
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

            cmd = CreateInsertUserWithStoredProcedure("SP_InEye_InsertUser", con, user); // create the command

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
        private SqlCommand CreateInsertUserWithStoredProcedure(String spName, SqlConnection con,UsersRegisterModel user)
        {

            SqlCommand cmd = new SqlCommand(); // create the command object

            cmd.Connection = con;              // assign the connection to the command object

            cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

            cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

            cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

            cmd.Parameters.AddWithValue("@role", user.Role);
            cmd.Parameters.AddWithValue("@lastSeen", user.LastSeen);
            cmd.Parameters.AddWithValue("@fullName", user.FullName);
            cmd.Parameters.AddWithValue("@emailAddress", user.EmailAddress);
            cmd.Parameters.AddWithValue("@birthDate", user.BirthDate);
            cmd.Parameters.AddWithValue("@lat", user.Lat);
            cmd.Parameters.AddWithValue("@lng", user.Lng);
            cmd.Parameters.AddWithValue("@address", user.Address);
            cmd.Parameters.AddWithValue("@createdAt", user.CreatedAt);
            cmd.Parameters.AddWithValue("@password", user.Password);
            return cmd;
        }

        //-------------Update User-------------//
        public int UpdateUserDBS(int role, DateTime lastSeen, string fullName, string emailAddress, string password, DateTime birthDate, float lat, float lng, string address, string image, DateTime createdAt)
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

            cmd = CreateUpdatetUserWithStoredProcedure("SP_InEye_UpdateUser", con, role, lastSeen, fullName, emailAddress, password, birthDate, lat, lng, address, image, createdAt); // create the command

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
        private SqlCommand CreateUpdatetUserWithStoredProcedure(String spName, SqlConnection con, int role, DateTime lastSeen, string fullName, string emailAddress, string password, DateTime birthDate, float lat, float lng, string address, string image, DateTime createdAt)
        {

            SqlCommand cmd = new SqlCommand(); // create the command object

            cmd.Connection = con;              // assign the connection to the command object

            cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

            cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

            cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

            cmd.Parameters.AddWithValue("@role",role);
            cmd.Parameters.AddWithValue("@lastSeen",lastSeen);
            cmd.Parameters.AddWithValue("@fullName", fullName);
            cmd.Parameters.AddWithValue("@emailAddress", emailAddress);
            cmd.Parameters.AddWithValue("@birthDate",birthDate);
            cmd.Parameters.AddWithValue("@lat", lat);
            cmd.Parameters.AddWithValue("@lng", lng);
            cmd.Parameters.AddWithValue("@address", address);
            cmd.Parameters.AddWithValue("@image", image);
            cmd.Parameters.AddWithValue("@createdAt",createdAt);
            cmd.Parameters.AddWithValue("@password", password);
            return cmd;
        }
    }
}
