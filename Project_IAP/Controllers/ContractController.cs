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
    public class ContractController : BaseController<Contract, ContractRepository>
    {
        ContractRepository _contractRepository;
        public ContractController(ContractRepository contractRepository) : base(contractRepository)
        {
            this._contractRepository = contractRepository;
        }

        [HttpPost]
        [Route("Apply")]
        public async Task<ActionResult<Contract>> ApplyInterview(Contract contract)
        {
            await _contractRepository.ApplyInterview(contract);
            return Ok("Apply Success");
        }

        [HttpPut]
        [Route("Confirmation")]
        public async Task<ActionResult<Contract>> ConfirmationInterview(Contract contract)
        {
            await _contractRepository.ApplyInterview(contract);
            return Ok("Confirmation Success, Status Interview");
        }
    }
}