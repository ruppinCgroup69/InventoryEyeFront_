
using InventoryEyeBack.Posts;
using InventoryEyeBack.Stores;
using Microsoft.Data.SqlClient;
using System.Data;

namespace InventoryEyeBack.Survey
{
    public class SurveyDBS
    {
        public SurveyDBS() { }
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

        //-------------Read all Survey -------------//
        public List<SurveyModel> ReadAllSurveyDBS(int id)
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
            List<SurveyModel> survey = new List<SurveyModel>();

            // create a Command with the connection to use, name of stored procedure and its parameters
            cmd = buildReadAllSurveyStoredProcedureCommand(con, "SP_InEye_ReadAllSurvey", id);

            // call the stored procedure (using the cmd) and get results to DataReader
            SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

            // iterate over the results, next moves to the next record
            while (dataReader.Read())
            {
                SurveyModel s = new SurveyModel();

                s.UserId= Convert.ToInt32(dataReader["UserId"].ToString());
                s.FavCategory= Convert.ToInt32(dataReader["FavCategory"].ToString());
                s.FavStore = Convert.ToInt32(dataReader["FavStore"].ToString());

                survey.Add(s);

            }

            if (con != null)
            {
                // close the db connection
                con.Close();
            }

            return survey;
        }
        private SqlCommand buildReadAllSurveyStoredProcedureCommand(SqlConnection con, String spName, int id)
        {

            SqlCommand cmd = new SqlCommand(); // create the command object

            cmd.Connection = con;              // assign the connection to the command object

            cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

            cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

            cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

            cmd.Parameters.AddWithValue("@id", id);

            return cmd;

        }

        //-------------Insert Survey-------------//
        public int InsertSurveyDBS(SurveyModel survey)
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

            cmd = CreateInsertSurveyWithStoredProcedure("SP_InEye_InsertSurvey", con, survey); // create the command

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
        private SqlCommand CreateInsertSurveyWithStoredProcedure(String spName, SqlConnection con, SurveyModel survey)
        {

            SqlCommand cmd = new SqlCommand(); // create the command object

            cmd.Connection = con;              // assign the connection to the command object

            cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

            cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

            cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

            cmd.Parameters.AddWithValue("@userId", survey.UserId);
            cmd.Parameters.AddWithValue("@favCategory", survey.FavCategory);
            cmd.Parameters.AddWithValue("@favStore", survey.FavStore);

            return cmd;
        }

        //-------------Update Survey-------------//
        public int  UpdateSurveyDBS(SurveyModel survey)
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

            cmd = CreateUpdatetSurveyWithStoredProcedure("SP_InEye_UpdateSurvey", con, survey); // create the command

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
        private SqlCommand CreateUpdatetSurveyWithStoredProcedure(String spName, SqlConnection con, SurveyModel survey)
        {

            SqlCommand cmd = new SqlCommand(); // create the command object

            cmd.Connection = con;              // assign the connection to the command object

            cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

            cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

            cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

            cmd.Parameters.AddWithValue("@userId", survey.UserId);
            cmd.Parameters.AddWithValue("@favCategory", survey.FavCategory);
            cmd.Parameters.AddWithValue("@favStore", survey.FavStore);

            return cmd;
        }

        //-------------Delete Survey -------------//
        public bool DeleteSurveyDBS(int userId, int? favCategory = null, int? favStore = null)
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

            cmd = CreateDeleteSurveyWithStoredProcedure("SP_InEye_DeleteSurvey", con, userId, favCategory, favStore); // Create the command

            try
            {
                cmd.ExecuteNonQuery(); // execute the command
                return true;
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
        private SqlCommand CreateDeleteSurveyWithStoredProcedure(String spName, SqlConnection con, int userId, int? favCategory, int? favStore)
        {

            SqlCommand cmd = new SqlCommand(); // create the command object

            cmd.Connection = con;              // assign the connection to the command object

            cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

            cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

            cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

            cmd.Parameters.AddWithValue("@userId", userId);

            if (favCategory.HasValue)
            {
                cmd.Parameters.AddWithValue("@favCategory", favCategory.Value);
            }
            else
            {
                cmd.Parameters.AddWithValue("@favCategory", DBNull.Value);
            }

            if (favStore.HasValue)
            {
                cmd.Parameters.AddWithValue("@favStore", favStore.Value);
            }
            else
            {
                cmd.Parameters.AddWithValue("@favStore", DBNull.Value);
            }

            return cmd;
        }
    }
}
