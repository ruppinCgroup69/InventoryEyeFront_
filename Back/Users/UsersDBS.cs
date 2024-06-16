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
        public int InsertUserDBS(UsersModel user)
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
        private SqlCommand CreateInsertUserWithStoredProcedure(String spName, SqlConnection con, UsersModel user)
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
            cmd.Parameters.AddWithValue("@image", user.Image);
            cmd.Parameters.AddWithValue("@password", user.Password);
            return cmd;
        }

        //-------------Update User-------------//
        public int UpdateUserDBS(UsersModel user)
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

            cmd = CreateUpdatetUserWithStoredProcedure("SP_InEye_UpdateUser", con, user); // create the command

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
        private SqlCommand CreateUpdatetUserWithStoredProcedure(String spName, SqlConnection con, UsersModel user)
        {

            SqlCommand cmd = new SqlCommand(); // create the command object

            cmd.Connection = con;              // assign the connection to the command object

            cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

            cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

            cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

            cmd.Parameters.AddWithValue("@role", user.Role);
            cmd.Parameters.AddWithValue("@lastSeen", user.LastSeen);
            cmd.Parameters.AddWithValue("@fullName", user.FullName);
            cmd.Parameters.AddWithValue("@birthDate", user.BirthDate);
            cmd.Parameters.AddWithValue("@lat", user.Lat);
            cmd.Parameters.AddWithValue("@lng", user.Lng);
            cmd.Parameters.AddWithValue("@address", user.Address);
            cmd.Parameters.AddWithValue("@image", user.Image);
            cmd.Parameters.AddWithValue("@createdAt", user.CreatedAt);
            cmd.Parameters.AddWithValue("@password", user.Password);
            cmd.Parameters.AddWithValue("@emailAddress", user.EmailAddress);
            return cmd;
        }

        //-------------Update User Email-------------//
        public int UpdateUserEmailDBS(int id, string emailAddress)
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

            cmd = CreateUpdatetUserEmailWithStoredProcedure("SP_InEye_UpdateUserEmail", con, id,emailAddress); // create the command

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
        private SqlCommand CreateUpdatetUserEmailWithStoredProcedure(String spName, SqlConnection con,int id, string emailAddress)
        {

            SqlCommand cmd = new SqlCommand(); // create the command object

            cmd.Connection = con;              // assign the connection to the command object

            cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

            cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

            cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

            cmd.Parameters.AddWithValue("@id", id);
            cmd.Parameters.AddWithValue("@emailAddress", emailAddress);
            return cmd;
        }

        //-------------Delete User -------------//
        public int DeleteUserDBS(string email)
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

            cmd = CreateDeleteUserWithStoredProcedure("SP_InEye_DeleteUser", con, email); // create the command

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
        private SqlCommand CreateDeleteUserWithStoredProcedure(String spName, SqlConnection con, string email)
        {

            SqlCommand cmd = new SqlCommand(); // create the command object

            cmd.Connection = con;              // assign the connection to the command object

            cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

            cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

            cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

            cmd.Parameters.AddWithValue("@emailAddress", email);

            return cmd;
        }

        //-------------Login User -------------//
        public UserLoginModel LoginUserDBS(UsersModel user)
        {
            SqlConnection con;
            SqlCommand cmd;

            try
            {
                con = connect("MySqlConnectionString"); // create the connection
            }
            catch (Exception ex)
            {
                throw (ex);
            }

            // creat users list
            List<UserLoginModel> users = new List<UserLoginModel>();

            cmd = buildLoginUsersStoredProcedureCommand(con, "SP_InEye_Login", user);

            // call the stored procedure (using the cmd) and get results to DataReader
            SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

            // iterate over the results, next moves to the next record
            while (dataReader.Read())
            {
                // convert a record to Flat object
                UserLoginModel u = new UserLoginModel();
                u.Id = Convert.ToInt32(dataReader["Id"].ToString());
                u.Role = Convert.ToInt32(dataReader["Role"].ToString());
                u.RoleDesc = dataReader["RoleDesc"].ToString();
                u.LastSeen = Convert.ToDateTime(dataReader["LastSeen"].ToString());
                u.FullName = dataReader["FullName"].ToString();
                u.EmailAddress = dataReader["EmailAddress"].ToString();
                u.BirthDate = Convert.ToDateTime(dataReader["BirthDate"].ToString());
                u.Address = dataReader["Address"].ToString();
                u.Lat = Convert.ToDouble(dataReader["Lat"].ToString());
                u.Lng = Convert.ToDouble(dataReader["Lng"].ToString());
                u.Image = dataReader["Image"].ToString();
                u.CreatedAt = Convert.ToDateTime(dataReader["CreatedAt"].ToString());
                u.Score = Convert.ToInt32(dataReader["Score"].ToString());
                users.Add(u);
            }

            if (con != null)
            {
                // close the db connection
                con.Close();
            }
            if (users.Count == 0)
            {
                return null;
            }
            else
                return users[0];
        }
        private SqlCommand buildLoginUsersStoredProcedureCommand(SqlConnection con, string spName, UsersModel user)
        {
            SqlCommand cmd = new SqlCommand(); // create the command object

            cmd.Connection = con;              // assign the connection to the command object

            cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

            cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

            cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

            cmd.Parameters.AddWithValue("@email", user.EmailAddress);
            cmd.Parameters.AddWithValue("@password", user.Password);
            return cmd;
        }

        //-------------Read all Users -------------//
        public List<UsersModel> ReadAllUsersDBS()
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
            List<UsersModel> users = new List<UsersModel>();

            // create a Command with the connection to use, name of stored procedure and its parameters
            cmd = buildReadAllUsersStoredProcedureCommand(con, "SP_InEye_ReadAllUsers");

            // call the stored procedure (using the cmd) and get results to DataReader
            SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

            // iterate over the results, next moves to the next record
            while (dataReader.Read())
            {
                UsersModel u = new UsersModel();
                u.Id = Convert.ToInt32(dataReader["Id"].ToString());
                u.Role = Convert.ToInt32(dataReader["Role"].ToString());
                u.LastSeen = Convert.ToDateTime(dataReader["LastSeen"].ToString());
                u.FullName = dataReader["FullName"].ToString();
                u.EmailAddress = dataReader["EmailAddress"].ToString();
                u.BirthDate = Convert.ToDateTime(dataReader["BirthDate"].ToString());
                u.Address = dataReader["Address"].ToString();
                u.Lat = Convert.ToDouble(dataReader["Lat"].ToString());
                u.Lng = Convert.ToDouble(dataReader["Lng"].ToString());
                u.Image = dataReader["Image"].ToString();
                u.CreatedAt = Convert.ToDateTime(dataReader["CreatedAt"].ToString());
                u.Score = Convert.ToInt32(dataReader["Score"].ToString());
                users.Add(u);
            }

            if (con != null)
            {
                // close the db connection
                con.Close();
            }

            return users;
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

        //-------------Read User by id -------------//
        public UsersModel ReadUserByIdDBS(int id)
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

            UsersModel u = new UsersModel();
            // create a Command with the connection to use, name of stored procedure and its parameters
            cmd = buildReadUserByIdStoredProcedureCommand(con, "SP_InEye_ReadUserById", id);

            // call the stored procedure (using the cmd) and get results to DataReader
            SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

            // iterate over the results, next moves to the next record
            while (dataReader.Read())
            {
                u.Id = Convert.ToInt32(dataReader["Id"].ToString());
                u.Role = Convert.ToInt32(dataReader["Role"].ToString());
                u.LastSeen = Convert.ToDateTime(dataReader["LastSeen"].ToString());
                u.FullName = dataReader["FullName"].ToString();
                u.EmailAddress = dataReader["EmailAddress"].ToString();
                u.BirthDate = Convert.ToDateTime(dataReader["BirthDate"].ToString());
                u.Address = dataReader["Address"].ToString();
                u.Lat = Convert.ToDouble(dataReader["Lat"].ToString());
                u.Lng = Convert.ToDouble(dataReader["Lng"].ToString());
                u.Image = dataReader["Image"].ToString();
                u.CreatedAt = Convert.ToDateTime(dataReader["CreatedAt"].ToString());
                u.Score = Convert.ToInt32(dataReader["Score"].ToString());
            }

            if (con != null)
            {
                // close the db connection
                con.Close();
            }

            return u;
        }
        private SqlCommand buildReadUserByIdStoredProcedureCommand(SqlConnection con, String spName, int id)
        {

            SqlCommand cmd = new SqlCommand(); // create the command object

            cmd.Connection = con;              // assign the connection to the command object

            cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

            cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

            cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text
            
            cmd.Parameters.AddWithValue("@id", id);
            return cmd;
        }
    }

}
