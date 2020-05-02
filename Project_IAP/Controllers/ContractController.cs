using System.Threading.Tasks;
using MailKit.Net.Smtp;
using Microsoft.AspNetCore.Mvc;
using MimeKit;
using Project_IAP.Base;
using Project_IAP.Models;
using Project_IAP.Repository.Data;

namespace Project_IAP.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContractController : BaseController<Placement, PlacementRepository>
    {
        private readonly PlacementRepository _contractRepository;
        public ContractController(PlacementRepository contractRepository) : base(contractRepository)
        {
            this._contractRepository = contractRepository;
        }

        [HttpPost]
        [Route("Apply")]
        public async Task<ActionResult<Placement>> ApplyInterview(Placement contract)
        {
            await _contractRepository.ApplyInterview(contract);
            return Ok("Apply Success");
        }

        [HttpPut]
        [Route("ConfirmInterview")]
        public async Task<ActionResult<Placement>> ConfirmInterview(Placement contract)
        {
            await _contractRepository.ConfirmInterview(contract);
            return Ok("Confirmation Success, Status Interview");
        }

        [HttpPut]
        [Route("ConfirmPlacement")]
        public async Task<ActionResult<Placement>> ConfirmPlacement(Placement contract)
        {
            await _contractRepository.ConfirmPlacement(contract);
            SendEmail();
            return Ok("Confirmation Success, Status Placement, Mail Sent");
        }

        public IActionResult SendEmail()
        {
            var message = new MimeMessage();
            //Pengirim Email, parameter : Nama Pengirim, Email Pengirim
            message.From.Add(new MailboxAddress("Project_IAP FROM","web.tester1998@gmail.com"));
            //Penerima Email, parameter : Nama Penerima, Email Penerima
            message.To.Add(new MailboxAddress("Project_IAP TO", "muhamadaslam001@gmail.com"));

            //Subject
            message.Subject = "Send Email for Confirmation Replacement";
            //Body Message untuk dikirim
            message.Body = new TextPart("plain")
            {
                Text = "Hello World" //For Body Message
            };

            using (var client = new SmtpClient())
            {
                client.Connect("smtp.gmail.com",587,false);
                client.Authenticate("web.tester1998@gmail.com","cgv261479");
                client.Send(message);

                client.Disconnect(true);
            }
            return Ok();
        }
    }
}