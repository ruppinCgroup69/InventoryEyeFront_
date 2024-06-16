
using InventoryEyeBack.CommentScore;
using InventoryEyeBack.Users;
using Microsoft.Data.SqlClient;
using System.Data;

namespace InventoryEyeBack.Weights
{
    public class WeightsDBS
    {
        public WeightsDBS() { }
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

        //-------------Read all Weights -------------//
        public List<WeightsModel> ReadAllWeightsDBS()
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
            List<WeightsModel> weights = new List<WeightsModel>();

            // create a Command with the connection to use, name of stored procedure and its parameters
            cmd = buildReadAllWeightsStoredProcedureCommand(con, "SP_InEye_ReadAllWeights");

            // call the stored procedure (using the cmd) and get results to DataReader
            SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

            // iterate over the results, next moves to the next record
            while (dataReader.Read())
            {
                WeightsModel w = new WeightsModel();
                w.GeneralWeight = Convert.ToInt32(dataReader["GeneralWeight"].ToString());
                w.BoughtWeight = Convert.ToInt32(dataReader["BoughtWeight"].ToString());
                w.CredibilityWeight = Convert.ToInt32(dataReader["CredibilityWeight"].ToString());
                weights.Add(w);
            }

            if (con != null)
            {
                // close the db connection
                con.Close();
            }

            return weights;
        }
        private SqlCommand buildReadAllWeightsStoredProcedureCommand(SqlConnection con, String spName)
        {

            SqlCommand cmd = new SqlCommand(); // create the command object

            cmd.Connection = con;              // assign the connection to the command object

            cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

            cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

            cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

            return cmd;
        }

        //-------------Update Weights -------------//
        public int UpdateWeightsDBS(WeightsModel weights)
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

            cmd = CreateUpdatetWeightsWithStoredProcedure("SP_InEye_UpdateWeights", con, weights); // create the command

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
        private SqlCommand CreateUpdatetWeightsWithStoredProcedure(String spName, SqlConnection con, WeightsModel weights)
        {

            SqlCommand cmd = new SqlCommand(); // create the command object

            cmd.Connection = con;              // assign the connection to the command object

            cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

            cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

            cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

            cmd.Parameters.AddWithValue("@generalWeight", weights.GeneralWeight);
            cmd.Parameters.AddWithValue("@boughtWeight", weights.BoughtWeight);
            cmd.Parameters.AddWithValue("@credibilityWeight", weights.CredibilityWeight);

            return cmd;
        }
    }
}
