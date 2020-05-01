using Dapper;
using Microsoft.Extensions.Configuration;
using Project_IAP.Context;
using Project_IAP.Models;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Threading.Tasks;

namespace Project_IAP.Repository.Data
{
    public class PlacementRepository : GeneralRepository<Placement, MyContext>
    {
        private readonly MyContext _myContext;
        DynamicParameters parameters = new DynamicParameters();
        IConfiguration _configuration { get; }
        public PlacementRepository(MyContext mycontexts, IConfiguration configuration) : base(mycontexts)
        {
            _configuration = configuration;
            _myContext = mycontexts;
        }

        public async Task<IEnumerable<Placement>> ApplyInterview(Placement contract)
        {
            using (var connection = new SqlConnection(_configuration.GetConnectionString("MyConnection")))
            {
                var spName = "SP_Insert_TB_T_Contract";
                parameters.Add("@EmployeeId", contract.EmployeeId);
                parameters.Add("@InterviewId", contract.InterviewId);
                var data = await connection.QueryAsync<Placement>(spName, parameters, commandType: CommandType.StoredProcedure);
                return data;
            }
        }
        public async Task<IEnumerable<Placement>> ConfirmInterview(Placement contract)
        {
            using (var connection = new SqlConnection(_configuration.GetConnectionString("MyConnection")))
            {
                var spName = "SP_ConfirmInterview_TB_T_Contract";
                parameters.Add("@EmployeeId", contract.EmployeeId);
                parameters.Add("@InterviewId", contract.InterviewId);
                var data = await connection.QueryAsync<Placement>(spName, parameters, commandType: CommandType.StoredProcedure);
                return data;
            }
        }

        public async Task<IEnumerable<Placement>> ConfirmPlacement(Placement contract)
        {
            using (var connection = new SqlConnection(_configuration.GetConnectionString("MyConnection")))
            {
                var spName = "SP_ConfirmPlacement_TB_T_Contract";
                parameters.Add("@EmployeeId", contract.EmployeeId);
                parameters.Add("@InterviewId", contract.InterviewId);
                parameters.Add("@StartC", contract.StartContract);
                parameters.Add("@EndC", contract.EndContract);
                var data = await connection.QueryAsync<Placement>(spName, parameters, commandType: CommandType.StoredProcedure);
                return data;
            }
        }

        public async Task<IEnumerable<Placement>> GetAllUser()
        {
            using (var connection = new SqlConnection(_configuration.GetConnectionString("MyConnection")))
            {
                var spName = "SP_Retrieve_TB_T_Contract";
                var data = await connection.QueryAsync<Placement>(spName, parameters, commandType: CommandType.StoredProcedure);
                return data;
            }
        }

        public async Task<IEnumerable<Placement>> GetUser(int EmployeeId)
        {
            using (var connection = new SqlConnection(_configuration.GetConnectionString("MyConnection")))
            {
                var spName = "SP_UserRetrieve_TB_T_Contract";
                parameters.Add("@EmployeeId", EmployeeId);
                var data = await connection.QueryAsync<Placement>(spName, parameters, commandType: CommandType.StoredProcedure);
                return data;
            }
        }
    }
}
