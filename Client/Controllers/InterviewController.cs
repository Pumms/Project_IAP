using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Project_IAP.ViewModels;
using static Project_IAP.ViewModels.InterviewVM;

namespace Client.Controllers
{
    public class InterviewController : Controller
    {
        private HttpClient client = new HttpClient
        {
            BaseAddress = new Uri("https://localhost:44379/api/")
        };
        public IActionResult Index()
        {
            return View(LoadInterview());
        }
        public JsonResult LoadInterview()
        {
            //client.DefaultRequestHeaders.Add("Authorization", HttpContext.Session.GetString("JWTToken"));
            IEnumerable<InterviewVM> employee = null;
            var responseTask = client.GetAsync("Interview/List");
            responseTask.Wait();
            var result = responseTask.Result;
            if (result.IsSuccessStatusCode)
            {
                var readTask = result.Content.ReadAsAsync<IList<InterviewVM>>();
                readTask.Wait();
                employee = readTask.Result;
            }
            else
            {
                ModelState.AddModelError(string.Empty, "Server Error");
            }
            return Json(employee);
        }
    }
}