using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Project_IAP.Models;
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
            IEnumerable<InterviewVM> interview = null;
            var responseTask = client.GetAsync("Interview/List");
            responseTask.Wait();
            var result = responseTask.Result;
            if (result.IsSuccessStatusCode)
            {
                var readTask = result.Content.ReadAsAsync<IList<InterviewVM>>();
                readTask.Wait();
                interview = readTask.Result;
            }
            else
            {
                ModelState.AddModelError(string.Empty, "Server Error");
            }
            return Json(interview);
        }
        public JsonResult InsertOrUpdate(Interview interview)
        {
            //client.DefaultRequestHeaders.Add("Authorization", HttpContext.Session.GetString("JWTToken"));
            var myContent = JsonConvert.SerializeObject(interview);
            var buffer = System.Text.Encoding.UTF8.GetBytes(myContent);
            var byteContent = new ByteArrayContent(buffer);
            byteContent.Headers.ContentType = new MediaTypeHeaderValue("application/json");
            if (interview.Id.Equals(0))
            {
                var result = client.PostAsync("Interview/", byteContent).Result;
                return Json(result);
            }
            else
            {
                var result = client.PutAsync("Interview/" + interview.Id, byteContent).Result;
                return Json(result);
            }
        }
        public JsonResult GetById(int Id)
        {
            //client.DefaultRequestHeaders.Add("Authorization", HttpContext.Session.GetString("JWTToken"));
            Interview interview = null;
            var responseTask = client.GetAsync("Interview/" + Id);
            responseTask.Wait();
            var result = responseTask.Result;
            if (result.IsSuccessStatusCode)
            {
                var json = JsonConvert.DeserializeObject(result.Content.ReadAsStringAsync().Result).ToString();
                interview = JsonConvert.DeserializeObject<Interview>(json);
            }
            else
            {
                ModelState.AddModelError(string.Empty, "server error, try after some time");
            }
            return Json(interview);
        }
        public JsonResult Delete(int Id)
        {
            //client.DefaultRequestHeaders.Add("Authorization", HttpContext.Session.GetString("JWTToken"));
            var result = client.DeleteAsync("Interview/" + Id).Result;
            return Json(result);
        }
    }
}