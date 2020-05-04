using Dapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Project_IAP.Context;
using Project_IAP.Models;
using Project_IAP.ViewModels;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace Project_IAP.Repository.Data
{
    public class ReplacementRepository : GeneralRepository<Replacement, MyContext>
    {
        private readonly MyContext _myContext;
        DynamicParameters parameters = new DynamicParameters();
        IConfiguration _configuration { get; }
        public ReplacementRepository(MyContext mycontexts, IConfiguration configuration) : base(mycontexts)
        {
            _configuration = configuration;
            _myContext = mycontexts;
        }
        public async Task<IEnumerable<ReplacementVM>> GetAllReplacement()
        {
            using (var connection = new SqlConnection(_configuration.GetConnectionString("MyConnection")))
            {
                var spName = "SP_Retrieve_TB_T_Replacement";
                var data = await connection.QueryAsync<ReplacementVM>(spName, commandType: CommandType.StoredProcedure);
                return data;
            }
        }
        public async Task<IEnumerable<Replacement>> PutConfirm(Replacement replacement)
        {
            using (var connection = new SqlConnection(_configuration.GetConnectionString("MyConnection")))
            {
                var spName = "SP_Confirm_Replacement";
                parameters.Add("@Id", replacement.Id);
                parameters.Add("@Confirm", replacement.Confirmation);
                var data = await connection.QueryAsync<Replacement>(spName, parameters, commandType: CommandType.StoredProcedure);
                return data;
            }
        }
        public async Task<Replacement> Conf0(int id)
        {
            var entity = await Get(id);
            if (entity == null)
            {
                return entity;
            }
            entity.Confirmation = false;
            _myContext.Entry(entity).State = EntityState.Modified;
            await _myContext.SaveChangesAsync();
            return entity;
        }
        public async Task<Replacement> Conf1(int id)
        {
            var entity = await Get(id);
            if (entity == null)
            {
                return entity;
            }
            entity.Confirmation = true;
            _myContext.Entry(entity).State = EntityState.Modified;
            await _myContext.SaveChangesAsync();
            return entity;
        }
    }
}
