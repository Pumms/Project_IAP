using Dapper;
using Microsoft.Extensions.Configuration;
using Project_IAP.Context;
using Project_IAP.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace Project_IAP.Repository.Data
{
    public class ContractRepository : GeneralRepository<Contract, MyContext>
    {
        private readonly MyContext _myContext;
        DynamicParameters parameters = new DynamicParameters();
        IConfiguration _configuration { get; }
        public ContractRepository(MyContext mycontexts, IConfiguration configuration) : base(mycontexts)
        {
            _configuration = configuration;
            _myContext = mycontexts;
        }

        public async Task<IEnumerable<Contract>> ApplyInterview(Contract contract)
        {
            using (var connection = new SqlConnection(_configuration.GetConnectionString("MyConnection")))
            {
                var spName = "SP_Insert_TB_T_Contract";
                parameters.Add("@EmployeeId", contract.EmployeeId);
                parameters.Add("@InterviewId", contract.InterviewId);
                var data = await connection.QueryAsync<Contract>(spName, parameters, commandType: CommandType.StoredProcedure);
                return data;
            }
        }

        public async Task<IEnumerable<Contract>> ConfirmationInterview(Contract contract)
        {
            using (var connection = new SqlConnection(_configuration.GetConnectionString("MyConnection")))
            {
                var spName = "SP_ConfirmationInterview_TB_T_Contract";
                parameters.Add("@EmployeeId", contract.EmployeeId);
                parameters.Add("@InterviewId", contract.InterviewId);
                var data = await connection.QueryAsync<Contract>(spName, parameters, commandType: CommandType.StoredProcedure);
                return data;
            }
        }

        public async Task<IEnumerable<Contract>> GetAllUserInterview()
        {
            using (var connection = new SqlConnection(_configuration.GetConnectionString("MyConnection")))
            {
                var spName = "SP_Retrieve_TB_T_Contract";
                var data = await connection.QueryAsync<Contract>(spName, parameters, commandType: CommandType.StoredProcedure);
                return data;
            }
        }

        public async Task<IEnumerable<Contract>> GetUserInterview(int EmployeeId)
        {
            using (var connection = new SqlConnection(_configuration.GetConnectionString("MyConnection")))
            {
                var spName = "SP_UserRetrieve_TB_T_Contract";
                parameters.Add("@EmployeeId", EmployeeId);
                var data = await connection.QueryAsync<Contract>(spName, parameters, commandType: CommandType.StoredProcedure);
                return data;
            }
        }
    }
}
