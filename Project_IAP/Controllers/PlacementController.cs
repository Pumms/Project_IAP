using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MailKit.Net.Smtp;
using Microsoft.AspNetCore.Mvc;
using MimeKit;
using Project_IAP.Base;
using Project_IAP.Models;
using Project_IAP.Repository.Data;
using Project_IAP.ViewModels;

namespace Project_IAP.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlacementController : BaseController<Placement, PlacementRepository>
    {
        private readonly PlacementRepository _placementRepository;
        public PlacementController(PlacementRepository placementRepository) : base(placementRepository)
        {
            this._placementRepository = placementRepository;
        }

        //For List Data Placement
        [HttpGet]
        [Route("DataHistory")]
        public async Task<IEnumerable<PlacementVM>> DataHistory()
        {
            return await _placementRepository.DataHistory();
        }

        [HttpGet]
        [Route("DataUserHistory/{id}")]
        public async Task<IEnumerable<PlacementVM>> DataUserHistory(int id)
        {
            return await _placementRepository.DataUserHistory(id);
        }

        [HttpGet]
        [Route("DataUserPlacement/{id}")]
        public async Task<IEnumerable<PlacementVM>> DataUserPlacement(int id)
        {
            return await _placementRepository.DataUserPlacement(id);
        }

        [HttpGet]
        [Route("DataInterview")]
        public async Task<IEnumerable<PlacementVM>> DataInterview()
        {
            return await _placementRepository.DataInterview();
        }

        [HttpGet]
        [Route("DataPlacement")]
        public async Task<IEnumerable<PlacementVM>> DataPlacement()
        {
            return await _placementRepository.DataPlacement();
        }

        [HttpGet]
        [Route("GetByStatus/{id}")]
        public async Task<IEnumerable<PlacementVM>> GetByStatus(int id)
        {
            return await _placementRepository.GetByStatus(id);
        }
        //End For List Data Placement

        [HttpPost]
        [Route("AssignEmployee")]
        public async Task<ActionResult<Placement>> AssignEmployee(Placement placement)
        {
            await _placementRepository.AssignEmployee(placement);
            return Ok("Assign Success");
        }

        [HttpPut]
        [Route("CancelPlacement/{id}")]
        public async Task<ActionResult<Placement>> CancelPlacement(int id, PlacementVM entity)
        {
            if (id != entity.Id)
            {
                return BadRequest();
            }
            var confirm = await _placementRepository.CancelPlacement(entity.Id);
            await _placementRepository.SetWorkStatus(0, entity.UserId);
            if (confirm != null)
            {
                SendEmail(entity, "cancel");
            }
            return Ok("Canceled success");
        }

        [HttpPut]
        [Route("ConfirmInterview/{id}")]
        public async Task<ActionResult<Placement>> ConfirmInterview(int id, PlacementVM entity)
        {
            if (id != entity.Id)
            {
                return BadRequest();
            }

            var confirm = await _placementRepository.ConfirmInterview(entity.Id);
            await _placementRepository.SetWorkStatus(1, entity.UserId);

            if (confirm != null)
            {
                SendEmail(entity, "interview");
            }
            return Ok("Confirmation Interview Success");
        }

        [HttpPut]
        [Route("ConfirmPlacement/{id}")]
        public async Task<ActionResult<Placement>> ConfirmPlacement(int id, PlacementVM entity)
        {
            if (id != entity.Id)
            {
                return BadRequest();
            }

            var confirm = await _placementRepository.ConfirmPlacement(entity.Id, entity);

            if (confirm != null)
            {
                SendEmail(entity, "placement");
            }
            return Ok("Confirmation Placement success");
        }

        public IActionResult SendEmail(PlacementVM placement, string status)
        {
            var message = new MimeMessage();
            //Pengirim Email, parameter : Nama Pengirim, Email Pengirim
            message.From.Add(new MailboxAddress("Admin", "web.tester1998@gmail.com"));
            //Penerima Email, parameter : Nama Penerima, Email Penerima
            message.To.Add(new MailboxAddress(placement.FullName, placement.Email));

            var date = DateTime.Now.ToShortDateString();
            var interviewdate = placement.InterviewDate.ToShortDateString();

            if (status == "placement")
            {
                //Subject
                message.Subject = "Confirmation Placement " + date;
                message.Body = new TextPart("html")
                {
                    Text = "Dear " + placement.FullName + ",<br>" +
                   "Your Interview has been Confirmed, here your Data Contract : <br>" +
                   "Start Contract : " + placement.StartContract.ToShortDateString() + "<br>" +
                   "End Contract : " + placement.EndContract.ToShortDateString() + "<br><br>" +
                   "Best Regards <br>" +
                   "Admin"
                };
            }
            if (status == "cancel")
            {
                //Subject
                message.Subject = "Job Application Canceled " + date;
                message.Body = new TextPart("html")
                {
                    Text = "Dear " + placement.FullName + ",<br>" +
                   "Sorry, your Apply has been Canceled, try again in another Interview and Good luck! <br><br>" +
                   "Best Regards <br>" +
                   "Admin"
                };
            }
            if (status == "interview")
            {
                //Subject
                message.Subject = "Confirmation Interview " + date;
                message.Body = new TextPart("html")
                {
                    Text = "Dear " + placement.FullName + ",<br>" +
                "Your Apply has been Confirmed, here Address for Interview : <br>" +
                "Date Interview :" + interviewdate + "<br>" +
                placement.AddressInterview + "<br>" +
                "Best Regards <br>" +
                "Admin"
                };
            }

            using (var client = new SmtpClient())
            {
                client.Connect("smtp.gmail.com", 587, false);
                client.Authenticate("web.tester1998@gmail.com", "cgv261479");
                client.Send(message);

                client.Disconnect(true);
            }
            return Ok();
        }
    }
}