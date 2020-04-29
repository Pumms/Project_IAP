using Project_IAP.Context;
using Project_IAP.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Project_IAP.Repository.Data
{
    public class RoleRepository : GeneralRepository<Role, MyContext>
    {
        public RoleRepository(MyContext mycontexts) : base(mycontexts)
        {

        }
    }
}
