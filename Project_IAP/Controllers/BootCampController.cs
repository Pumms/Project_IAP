using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Project_IAP.Base;
using Project_IAP.Models;
using Project_IAP.Repository.Data;

namespace Project_IAP.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BootCampController : BaseController<BootCamp, BootCampRepository>
    {
        public BootCampController(BootCampRepository bootCampRepository) : base(bootCampRepository)
        {

        }

    }
}