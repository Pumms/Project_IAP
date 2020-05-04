using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Project_IAP.Base;
using Project_IAP.Models;
using Project_IAP.Repository.Data;
using Project_IAP.ViewModels;

namespace Project_IAP.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReplacementController : BaseController<Replacement, ReplacementRepository>
    {
        private readonly ReplacementRepository _replacementRepository;
        public ReplacementController(ReplacementRepository replacementRepository) : base(replacementRepository)
        {
            _replacementRepository = replacementRepository;
        }
        [HttpGet]
        [Route("List")]
        public async Task<IEnumerable<ReplacementVM>> GetAll()
        {
            return await _replacementRepository.GetAllReplacement();
        }
        [HttpDelete]
        [Route("Confirm0/{Id}")]
        public async Task<ActionResult> Confirm0(int id)
        {
            var delete = await _replacementRepository.Conf0(id);
            if (delete == null)
            {
                return NotFound();
            }
            return Ok(delete);
        }
        [HttpDelete]
        [Route("Confirm1/{Id}")]
        public async Task<ActionResult> Confirm1(int id)
        {
            var delete = await _replacementRepository.Conf1(id);
            if (delete == null)
            {
                return NotFound();
            }
            return Ok(delete);
        }
    }
}