using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Project_IAP.Models;

namespace Client.Controllers
{
    public class BootCampController : Controller
    {
        private HttpClient client = new HttpClient
        {
            BaseAddress = new Uri("https://localhost:44379/api/")
        };
        public IActionResult Index()
        {
            return View(LoadBootCamp());
        }
        public JsonResult LoadBootCamp()
        {
            BootCampJson bootcamp = null;
            var responseTask = client.GetAsync("BootCamp");
            responseTask.Wait();
            var result = responseTask.Result;
            if (result.IsSuccessStatusCode)
            {
                var json = JsonConvert.DeserializeObject(result.Content.ReadAsStringAsync().Result).ToString();
                bootcamp = JsonConvert.DeserializeObject<BootCampJson>(json);
            }
            else
            {
                ModelState.AddModelError(string.Empty, "Server Error");
            }
            return Json(bootcamp);
        }
        public JsonResult InsertOrUpdate(BootCamp bootcamp)
        {
            var myContent = JsonConvert.SerializeObject(bootcamp);
            var buffer = System.Text.Encoding.UTF8.GetBytes(myContent);
            var byteContent = new ByteArrayContent(buffer);
            byteContent.Headers.ContentType = new MediaTypeHeaderValue("application/json");
            if (bootcamp.Id.Equals(0))
            {
                var result = client.PostAsync("BootCamp/", byteContent).Result;
                return Json(result);
            }
            else
            {
                var result = client.PutAsync("BootCamp/" + bootcamp.Id, byteContent).Result;
                return Json(result);
            }
        }
        public JsonResult GetById(int id)
        {
            BootCamp bootcamp = null;
            var responseTask = client.GetAsync("BootCamp/" + id);
            responseTask.Wait();
            var result = responseTask.Result;
            if (result.IsSuccessStatusCode)
            {
                var json = JsonConvert.DeserializeObject(result.Content.ReadAsStringAsync().Result).ToString();
                bootcamp = JsonConvert.DeserializeObject<BootCamp>(json);
            }
            else
            {
                ModelState.AddModelError(string.Empty, "server error, try after some time");
            }
            return Json(bootcamp);
        }
        public JsonResult Delete(int id)
        {
            var result = client.DeleteAsync("BootCamp/" + id).Result;
            return Json(result);
        }
    }
}