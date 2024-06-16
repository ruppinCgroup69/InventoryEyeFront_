
using InventoryEyeBack.Comments;
using Microsoft.Data.SqlClient;
using System.Data;

namespace InventoryEyeBack.CommentScore
{
    public class CommentScoreDBS
    {
        public CommentScoreDBS() { }
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

        //-------------Insert Comment Score-------------//
        public int InsertCommentScoreDBS(CommentScoreModel commentScore)
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

            cmd = CreateInsertCommentScoreWithStoredProcedure("SP_InEye_InsertCommentScore", con, commentScore); // create the command

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
        private SqlCommand CreateInsertCommentScoreWithStoredProcedure(String spName, SqlConnection con, CommentScoreModel commentScore)
        {

            SqlCommand cmd = new SqlCommand(); // create the command object

            cmd.Connection = con;              // assign the connection to the command object

            cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

            cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

            cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

            cmd.Parameters.AddWithValue("@generalScore", commentScore.GeneralScore);
            cmd.Parameters.AddWithValue("@credibility", commentScore.Credability);
            cmd.Parameters.AddWithValue("@bought", commentScore.Bought ? "true" : "false");
            cmd.Parameters.AddWithValue("@content", commentScore.Content);
            cmd.Parameters.AddWithValue("@publishdBy", commentScore.PublishedBy);
            cmd.Parameters.AddWithValue("@commentId", commentScore.CommentId);

            return cmd;
        }

        //-------------Update Comment Score-------------//
        public int UpdateCommentScoreDBS(CommentScoreModel commentScore)
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

            cmd = CreateUpdatetCommentScoreWithStoredProcedure("SP_InEye_UpdateCommentScore", con, commentScore); // create the command

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
        private SqlCommand CreateUpdatetCommentScoreWithStoredProcedure(String spName, SqlConnection con, CommentScoreModel commentScore)
        {

            SqlCommand cmd = new SqlCommand(); // create the command object

            cmd.Connection = con;              // assign the connection to the command object

            cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

            cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

            cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

            cmd.Parameters.AddWithValue("@commentId", commentScore.CommentId);
            cmd.Parameters.AddWithValue("@publishedBy", commentScore.PublishedBy);
            cmd.Parameters.AddWithValue("@ratedBy", commentScore.RatedBy);
            cmd.Parameters.AddWithValue("@content", commentScore.Content);

            return cmd;
        }

        //-------------Delete Comment Score -------------//
        public int DeleteCommentScoreDBS(int commentId, int ratedBy)
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

            cmd = CreateDeleteCommentScoreWithStoredProcedure("SP_InEye_DeleteCommentScore", con, commentId,ratedBy); // create the command

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
        private SqlCommand CreateDeleteCommentScoreWithStoredProcedure(String spName, SqlConnection con, int commentId, int ratedBy)
        {

            SqlCommand cmd = new SqlCommand(); // create the command object

            cmd.Connection = con;              // assign the connection to the command object

            cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

            cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

            cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

            cmd.Parameters.AddWithValue("@commentId", commentId);
            cmd.Parameters.AddWithValue("@ratedBy", ratedBy);

            return cmd;
        }

        //-------------Read Comment Score by comment id -------------//
        public CommentScoreModel ReadCommentScoreByCommentIdByCommentIdDBS(int commentId)
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

            CommentScoreModel cs = new CommentScoreModel();

            // create a Command with the connection to use, name of stored procedure and its parameters
            cmd = buildReadCommentScoreByCommentIdStoredProcedureCommand(con, "SP_InEye_ReadCommentScoreByCommentId", commentId);

            // call the stored procedure (using the cmd) and get results to DataReader
            SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

            if (dataReader.Read())
            {
                cs.CommentId = Convert.ToInt32(dataReader["CommentId"].ToString());
                cs.PublishedBy = Convert.ToInt32(dataReader["PublishedBy"].ToString());
                cs.RatedBy = Convert.ToInt32(dataReader["RatedBy"].ToString());
                cs.GeneralScore = Convert.ToInt32(dataReader["GeneralScore"].ToString());
                cs.Credability = Convert.ToInt32(dataReader["Credibility"].ToString());
                cs.Bought = Convert.ToBoolean(dataReader["Bought"]);
                cs.Content = dataReader["Content"].ToString();
            }
            if (con != null)
            {
                // close the db connection
                con.Close();
            }

            return cs;
        }
        private SqlCommand buildReadCommentScoreByCommentIdStoredProcedureCommand(SqlConnection con, String spName, int commentId)
        {

            SqlCommand cmd = new SqlCommand(); // create the command object

            cmd.Connection = con;              // assign the connection to the command object

            cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

            cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

            cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

            cmd.Parameters.AddWithValue("@commentId", commentId);
            return cmd;
        }

        //-------------Read Comment Score by Published User Id -------------//
        public CommentScoreModel ReadCommentScoreByPublishedUserIdDBS(int publishedBy)
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

            CommentScoreModel cs = new CommentScoreModel();

            // create a Command with the connection to use, name of stored procedure and its parameters
            cmd = buildReadCommentScoreByPublishedUserIdStoredProcedureCommand(con, "SP_InEye_ReadCommentScoreByPublishedUserId", publishedBy);

            // call the stored procedure (using the cmd) and get results to DataReader
            SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

            if (dataReader.Read())
            {
                cs.CommentId = Convert.ToInt32(dataReader["CommentId"].ToString());
                cs.PublishedBy = Convert.ToInt32(dataReader["PublishedBy"].ToString());
                cs.RatedBy = Convert.ToInt32(dataReader["RatedBy"].ToString());
                cs.GeneralScore = Convert.ToInt32(dataReader["GeneralScore"].ToString());
                cs.Credability = Convert.ToInt32(dataReader["Credibility"].ToString());
                cs.Bought = Convert.ToBoolean(dataReader["Bought"]);
                cs.Content = dataReader["Content"].ToString();
            }
            if (con != null)
            {
                // close the db connection
                con.Close();
            }

            return cs;
        }
        private SqlCommand buildReadCommentScoreByPublishedUserIdStoredProcedureCommand(SqlConnection con, String spName, int publishedBy)
        {

            SqlCommand cmd = new SqlCommand(); // create the command object

            cmd.Connection = con;              // assign the connection to the command object

            cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

            cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

            cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

            cmd.Parameters.AddWithValue("@publishedBy", publishedBy);
            return cmd;
        }

        //-------------Read Comment Score by Rated By User Id -------------//
        public CommentScoreModel ReadCommentScoreByRatedUserIdDBS(int ratedBy)
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

            CommentScoreModel cs = new CommentScoreModel();

            // create a Command with the connection to use, name of stored procedure and its parameters
            cmd = buildReadCommentScoreByRatedByUserIdStoredProcedureCommand(con, "SP_InEye_ReadCommentScoreByRatedByUserId", ratedBy);

            // call the stored procedure (using the cmd) and get results to DataReader
            SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

            if (dataReader.Read())
            {
                cs.CommentId = Convert.ToInt32(dataReader["CommentId"].ToString());
                cs.PublishedBy = Convert.ToInt32(dataReader["PublishedBy"].ToString());
                cs.RatedBy = Convert.ToInt32(dataReader["RatedBy"].ToString());
                cs.GeneralScore = Convert.ToInt32(dataReader["GeneralScore"].ToString());
                cs.Credability = Convert.ToInt32(dataReader["Credibility"].ToString());
                cs.Bought = Convert.ToBoolean(dataReader["Bought"]);
                cs.Content = dataReader["Content"].ToString();
            }
            if (con != null)
            {
                // close the db connection
                con.Close();
            }

            return cs;
        }
        private SqlCommand buildReadCommentScoreByRatedByUserIdStoredProcedureCommand(SqlConnection con, String spName, int ratedBy)
        {

            SqlCommand cmd = new SqlCommand(); // create the command object

            cmd.Connection = con;              // assign the connection to the command object

            cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

            cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

            cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

            cmd.Parameters.AddWithValue("@ratedBy", ratedBy);
            return cmd;
        }
    }
}
