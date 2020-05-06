using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Project_IAP.Models;
using Project_IAP.ViewModels;

namespace Client.Controllers
{
    public class PlacementController : Controller
    {
        private HttpClient client = new HttpClient
        {
            BaseAddress = new Uri("https://localhost:44379/api/")
        };

        public IActionResult Index()
        {
            return View();
        }

        public JsonResult LoadHistory()
        {
            IEnumerable<PlacementVM> placement = null;
            var responseTask = client.GetAsync("Placement/DataHistory");
            responseTask.Wait();
            var result = responseTask.Result;
            if (result.IsSuccessStatusCode)
            {
                var readTask = result.Content.ReadAsAsync<IList<PlacementVM>>();
                readTask.Wait();
                placement = readTask.Result;
            }
            else
            {
                ModelState.AddModelError(string.Empty, "Server Error");
            }
            return Json(placement);
        }
        
        public JsonResult LoadEmployee()
        {
            IEnumerable<User> user = null;
            var responseTask = client.GetAsync("User/GetAll");
            responseTask.Wait();
            var result = responseTask.Result;
            if (result.IsSuccessStatusCode)
            {
                var readTask = result.Content.ReadAsAsync<IList<User>>();
                readTask.Wait();
                user = readTask.Result;
            }
            else
            {
                ModelState.AddModelError(string.Empty, "Server Error");
            }
            return Json(user);
        }

        public JsonResult LoadEmpInterview()
        {
            IEnumerable<PlacementVM> placement = null;
            var responseTask = client.GetAsync("Placement/DataInterview");
            responseTask.Wait();
            var result = responseTask.Result;
            if (result.IsSuccessStatusCode)
            {
                var readTask = result.Content.ReadAsAsync<IList<PlacementVM>>();
                readTask.Wait();
                placement = readTask.Result;
            }
            else
            {
                ModelState.AddModelError(string.Empty, "Server Error");
            }
            return Json(placement);
        }

        public JsonResult LoadEmpPlacement()
        {
            IEnumerable<PlacementVM> placement = null;
            var responseTask = client.GetAsync("Placement/DataPlacement");
            responseTask.Wait();
            var result = responseTask.Result;
            if (result.IsSuccessStatusCode)
            {
                var readTask = result.Content.ReadAsAsync<IList<PlacementVM>>();
                readTask.Wait();
                placement = readTask.Result;
            }
            else
            {
                ModelState.AddModelError(string.Empty, "Server Error");
            }
            return Json(placement);
        }

        public JsonResult AssignEmployee(Placement placement)
        {
            var myContent = JsonConvert.SerializeObject(placement);
            var buffer = System.Text.Encoding.UTF8.GetBytes(myContent);
            var byteContent = new ByteArrayContent(buffer);
            byteContent.Headers.ContentType = new MediaTypeHeaderValue("application/json");

            var result = client.PostAsync("Placement/AssignEmployee", byteContent).Result;
            return Json(result);
        }

        public JsonResult ConfirmInterview(PlacementVM placement)
        {
            var myContent = JsonConvert.SerializeObject(placement);
            var buffer = System.Text.Encoding.UTF8.GetBytes(myContent);
            var byteContent = new ByteArrayContent(buffer);
            byteContent.Headers.ContentType = new MediaTypeHeaderValue("application/json");

            var result = client.PutAsync("Placement/ConfirmInterview/" + placement.Id, byteContent).Result;
            return Json(result);
        }

        public JsonResult ConfirmPlacement(PlacementVM placement)
        {
            var myContent = JsonConvert.SerializeObject(placement);
            var buffer = System.Text.Encoding.UTF8.GetBytes(myContent);
            var byteContent = new ByteArrayContent(buffer);
            byteContent.Headers.ContentType = new MediaTypeHeaderValue("application/json");

            var result = client.PutAsync("Placement/ConfirmPlacement/" + placement.Id, byteContent).Result;
            return Json(result);
        }

        public JsonResult CancelPlacement(PlacementVM placement)
        {
            var myContent = JsonConvert.SerializeObject(placement);
            var buffer = System.Text.Encoding.UTF8.GetBytes(myContent);
            var byteContent = new ByteArrayContent(buffer);
            byteContent.Headers.ContentType = new MediaTypeHeaderValue("application/json");

            var result = client.PutAsync("Placement/CancelPlacement/" + placement.Id, byteContent).Result;
            return Json(result);
        }

        public JsonResult GetByStatus(int id)
        {
            IEnumerable<PlacementVM> placement = null;
            var responseTask = client.GetAsync("Placement/GetByStatus/" + id);
            responseTask.Wait();
            var result = responseTask.Result;
            if (result.IsSuccessStatusCode)
            {
                var readTask = result.Content.ReadAsAsync<IList<PlacementVM>>();
                readTask.Wait();
                placement = readTask.Result;
            }
            else
            {
                ModelState.AddModelError(string.Empty, "Server error, try after some time");
            }
            return Json(placement);
        }
    }
}