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
    public class UserRepository : GeneralRepository<User, MyContext>
    {
        IConfiguration _configuration { get; }
        public UserRepository(MyContext mycontexts, IConfiguration configuration) : base(mycontexts)
        {
            _configuration = configuration;
        }

        public async Task<IEnumerable<User>> GetAll()
        {
            using (var connection = new SqlConnection(_configuration.GetConnectionString("MyConnection")))
            {
                var spName = "SP_Retrieve_TB_M_User";
                var data = await connection.QueryAsync<User>(spName, commandType: CommandType.StoredProcedure);
                return data;
            }
        }
    }
}
