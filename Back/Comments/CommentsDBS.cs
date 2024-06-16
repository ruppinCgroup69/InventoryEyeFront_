
using InventoryEyeBack.Posts;
using InventoryEyeBack.Users;
using Microsoft.Data.SqlClient;
using System.Data;

namespace InventoryEyeBack.Comments
{
    public class CommentsDBS
    {
        public CommentsDBS() { }
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

        //-------------Insert Comment-------------//
        public int InsertCommentDBS(CommentsModel comment)
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

            cmd = CreateInsertCommentWithStoredProcedure("SP_InEye_InsertComments", con, comment); // create the command

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
        private SqlCommand CreateInsertCommentWithStoredProcedure(String spName, SqlConnection con, CommentsModel comment)
        {

            SqlCommand cmd = new SqlCommand(); // create the command object

            cmd.Connection = con;              // assign the connection to the command object

            cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

            cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

            cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

            cmd.Parameters.AddWithValue("@postId", comment.PostId);
            cmd.Parameters.AddWithValue("@userId", comment.UserId);
            cmd.Parameters.AddWithValue("@createdAt", DateTime.Now);
            cmd.Parameters.AddWithValue("@editedAt", DateTime.Now);
            cmd.Parameters.AddWithValue("@content", comment.Content);
            cmd.Parameters.AddWithValue("@inventoryEye", comment.InventoryEye);
            cmd.Parameters.AddWithValue("@storeId", comment.StoreId);
            cmd.Parameters.AddWithValue("@stockId", comment.StockId);
            cmd.Parameters.AddWithValue("@storeLocation", comment.StoreLocation);
            cmd.Parameters.AddWithValue("@bought", comment.Bought);
            cmd.Parameters.AddWithValue("@boughtDate", comment.BoughtDate);
            cmd.Parameters.AddWithValue("@productQuality", comment.ProductQuality);

            return cmd;
        }

        //-------------Delete Comment -------------//
        public int DeleteCommentDBS(int id)
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

            cmd = CreateDeleteCommentWithStoredProcedure("SP_InEye_DeleteComments", con, id); // create the command

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
        private SqlCommand CreateDeleteCommentWithStoredProcedure(String spName, SqlConnection con, int id)
        {

            SqlCommand cmd = new SqlCommand(); // create the command object

            cmd.Connection = con;              // assign the connection to the command object

            cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

            cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

            cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

            cmd.Parameters.AddWithValue("@id", id);

            return cmd;
        }

        //-------------Read Comment by comment id -------------//
        public CommentsModel ReadCommentByCommentIdDBS(int commentId)
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


            CommentsModel c = null;

            // create a Command with the connection to use, name of stored procedure and its parameters
            cmd = buildReadCommentByIdStoredProcedureCommand(con, "SP_InEye_ReadCommentsBycommentId", commentId);

            // call the stored procedure (using the cmd) and get results to DataReader
            SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

            if (dataReader.Read())
            {
                c = new CommentsModel();
                c.CommentId = Convert.ToInt32(dataReader["Id"].ToString());
                c.UserName = dataReader["FullName"].ToString();
                c.UserImage = dataReader["Image"].ToString();
                c.CreatedAt = Convert.ToDateTime(dataReader["CreatedAt"].ToString());
                c.EditedAt = Convert.ToDateTime(dataReader["EditedAt"].ToString());
                c.UserId = Convert.ToInt32(dataReader["UserId"].ToString());
                c.Content = dataReader["Content"].ToString();
                c.InventoryEye = Convert.ToDateTime(dataReader["InventoryEye"].ToString());
                c.StoreLocation = dataReader["StoreLocation"].ToString();
                c.Bought = Convert.ToBoolean(dataReader["Bought"].ToString());
                c.BoughtDate = Convert.ToDateTime(dataReader["BoughtDate"].ToString());
                c.ProductQuality = Convert.ToInt32(dataReader["ProductQuality"].ToString());
                c.StoreId = Convert.ToInt32(dataReader["StoreId"].ToString());
                c.StockId = Convert.ToInt32(dataReader["StockId"].ToString());
                c.Score = Convert.ToInt32(dataReader["Score"].ToString());
                c.PostId = Convert.ToInt32(dataReader["PostId"].ToString());
            }
            else
            {
                // No rows returned, throw an exception
                throw new Exception($"Comment with ID {commentId} was not found.");
            }
            if (con != null)
            {
                // close the db connection
                con.Close();
            }

            return c;
        }
        private SqlCommand buildReadCommentByIdStoredProcedureCommand(SqlConnection con, String spName, int commentId)
        {

            SqlCommand cmd = new SqlCommand(); // create the command object

            cmd.Connection = con;              // assign the connection to the command object

            cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

            cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

            cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

            cmd.Parameters.AddWithValue("@id", commentId);
            return cmd;
        }

        //-------------Read all Comments -------------//
        public List<CommentsModel> ReadAllCommentsdDBS()
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
            List<CommentsModel> comments = new List<CommentsModel>();

            // create a Command with the connection to use, name of stored procedure and its parameters
            cmd = buildReadAllCommentsStoredProcedureCommand(con, "SP_InEye_ReadAllComments");

            // call the stored procedure (using the cmd) and get results to DataReader
            SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

            // iterate over the results, next moves to the next record
            while (dataReader.Read())
            {
                CommentsModel c = new CommentsModel();
                c.CommentId = Convert.ToInt32(dataReader["Id"].ToString());
                c.UserName = dataReader["FullName"].ToString();
                c.UserImage = dataReader["Image"].ToString();
                c.CreatedAt = Convert.ToDateTime(dataReader["CreatedAt"].ToString());
                c.EditedAt = Convert.ToDateTime(dataReader["EditedAt"].ToString());
                c.UserId = Convert.ToInt32(dataReader["UserId"].ToString());
                c.Content = dataReader["Content"].ToString();
                c.InventoryEye = Convert.ToDateTime(dataReader["InventoryEye"].ToString());
                c.StoreLocation = dataReader["StoreLocation"].ToString();
                c.Bought = Convert.ToBoolean(dataReader["Bought"].ToString());
                c.BoughtDate = Convert.ToDateTime(dataReader["BoughtDate"].ToString());
                c.ProductQuality = Convert.ToInt32(dataReader["ProductQuality"].ToString());
                c.StoreId = Convert.ToInt32(dataReader["StoreId"].ToString());
                c.StockId = Convert.ToInt32(dataReader["StockId"].ToString());
                c.Score = Convert.ToInt32(dataReader["Score"].ToString());
                c.PostId = Convert.ToInt32(dataReader["PostId"].ToString());
                comments.Add(c);
            }

            if (con != null)
            {
                // close the db connection
                con.Close();
            }

            return comments;
        }
        private SqlCommand buildReadAllCommentsStoredProcedureCommand(SqlConnection con, String spName)
        {

            SqlCommand cmd = new SqlCommand(); // create the command object

            cmd.Connection = con;              // assign the connection to the command object

            cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

            cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

            cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

            return cmd;
        }

        //-------------Read Comments by PostId -------------//
        public List<CommentsModel> ReadCommentsByPostIdDBS(int postId)
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
            List<CommentsModel> comments = new List<CommentsModel>();

            // create a Command with the connection to use, name of stored procedure and its parameters
            cmd = buildReadCommentsByPostIdStoredProcedureCommand(con, "SP_InEye_ReadCommentsByPostId", postId);

            // call the stored procedure (using the cmd) and get results to DataReader
            SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

            // iterate over the results, next moves to the next record
            while (dataReader.Read())
            {
                CommentsModel c = new CommentsModel();
                c.CommentId = Convert.ToInt32(dataReader["Id"].ToString());
                c.UserName = dataReader["FullName"].ToString();
                c.UserImage = dataReader["Image"].ToString();
                c.CreatedAt = Convert.ToDateTime(dataReader["CreatedAt"].ToString());
                c.EditedAt = Convert.ToDateTime(dataReader["EditedAt"].ToString());
                c.UserId = Convert.ToInt32(dataReader["UserId"].ToString());
                c.Content = dataReader["Content"].ToString();
                c.InventoryEye = Convert.ToDateTime(dataReader["InventoryEye"].ToString());
                c.StoreLocation = dataReader["StoreLocation"].ToString();
                c.Bought = Convert.ToBoolean(dataReader["Bought"].ToString());
                c.BoughtDate = Convert.ToDateTime(dataReader["BoughtDate"].ToString());
                c.ProductQuality = Convert.ToInt32(dataReader["ProductQuality"].ToString());
                c.StoreId = Convert.ToInt32(dataReader["StoreId"].ToString());
                c.StockId = Convert.ToInt32(dataReader["StockId"].ToString());
                c.Score = Convert.ToInt32(dataReader["Score"].ToString());
                c.PostId = Convert.ToInt32(dataReader["PostId"].ToString());
                comments.Add(c);
            }
            if (con != null)
            {
                // close the db connection
                con.Close();
            }

            return comments;
        }
        private SqlCommand buildReadCommentsByPostIdStoredProcedureCommand(SqlConnection con, String spName, int postId)
        {

            SqlCommand cmd = new SqlCommand(); // create the command object

            cmd.Connection = con;              // assign the connection to the command object

            cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

            cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

            cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

            cmd.Parameters.AddWithValue("@postId", postId);
            return cmd;
        }

        //-------------Read Comments by userId -------------//
        public List<CommentsModel> ReadCommentsByUserIdDBS(int userId)
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
            List<CommentsModel> comments = new List<CommentsModel>();

            // create a Command with the connection to use, name of stored procedure and its parameters
            cmd = buildReadCommentsByUserIdStoredProcedureCommand(con, "SP_InEye_ReadCommentsByUserId", userId);

            // call the stored procedure (using the cmd) and get results to DataReader
            SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

            // iterate over the results, next moves to the next record
            while (dataReader.Read())
            {
                CommentsModel c = new CommentsModel();
                c.CommentId = Convert.ToInt32(dataReader["Id"].ToString());
                c.UserName = dataReader["FullName"].ToString();
                c.UserImage = dataReader["Image"].ToString();
                c.CreatedAt = Convert.ToDateTime(dataReader["CreatedAt"].ToString());
                c.EditedAt = Convert.ToDateTime(dataReader["EditedAt"].ToString());
                c.UserId = Convert.ToInt32(dataReader["UserId"].ToString());
                c.Content = dataReader["Content"].ToString();
                c.InventoryEye = Convert.ToDateTime(dataReader["InventoryEye"].ToString());
                c.StoreLocation = dataReader["StoreLocation"].ToString();
                c.Bought = Convert.ToBoolean(dataReader["Bought"].ToString());
                c.BoughtDate = Convert.ToDateTime(dataReader["BoughtDate"].ToString());
                c.ProductQuality = Convert.ToInt32(dataReader["ProductQuality"].ToString());
                c.StoreId = Convert.ToInt32(dataReader["StoreId"].ToString());
                c.StockId = Convert.ToInt32(dataReader["StockId"].ToString());
                c.Score = Convert.ToInt32(dataReader["Score"].ToString());
                c.PostId = Convert.ToInt32(dataReader["PostId"].ToString());
                comments.Add(c);
            }
            if (con != null)
            {
                // close the db connection
                con.Close();
            }

            return comments;
        }
        private SqlCommand buildReadCommentsByUserIdStoredProcedureCommand(SqlConnection con, String spName, int userId)
        {

            SqlCommand cmd = new SqlCommand(); // create the command object

            cmd.Connection = con;              // assign the connection to the command object

            cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

            cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

            cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

            cmd.Parameters.AddWithValue("@userId", userId);
            return cmd;
        }

        //-------------Update Comment-------------//
        public int UpdateCommentDBS(CommentsModel comment)
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

            cmd = CreateUpdatetCommentWithStoredProcedure("SP_InEye_UpdateComments", con, comment); // create the command

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
        private SqlCommand CreateUpdatetCommentWithStoredProcedure(String spName, SqlConnection con, CommentsModel comment)
        {

            SqlCommand cmd = new SqlCommand(); // create the command object

            cmd.Connection = con;              // assign the connection to the command object

            cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

            cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

            cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

            cmd.Parameters.AddWithValue("@userId", comment.UserId);
            cmd.Parameters.AddWithValue("@createdAt", comment.CreatedAt.Date); // Pass only the date part
            cmd.Parameters.AddWithValue("@editedAt", DateTime.Now.Date); // Pass only the date part
            cmd.Parameters.AddWithValue("@content", comment.Content);
            cmd.Parameters.AddWithValue("@inventoryEye", comment.InventoryEye.Date); // Pass only the date part
            cmd.Parameters.AddWithValue("@storeId", comment.StoreId);
            cmd.Parameters.AddWithValue("@stockId", comment.StockId);
            cmd.Parameters.AddWithValue("@storeLocation", comment.StoreLocation);
            cmd.Parameters.AddWithValue("@bought", comment.Bought);
            cmd.Parameters.AddWithValue("@boughtDate", comment.BoughtDate.Date); // Pass only the date part
            cmd.Parameters.AddWithValue("@productQuality", comment.ProductQuality);

            return cmd;
        }
    }
}
