using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Project_IAP.Models;

namespace Client.Controllers
{
    public class EmployeeController : Controller
    {
        private HttpClient client = new HttpClient
        {
            BaseAddress = new Uri("https://localhost:44379/api/")
        };
        public IActionResult Index()
        {
            return View();
        }
        public JsonResult LoadEmployee()
        {
            EmployeeJson employee = null;
            var responseTask = client.GetAsync("Employee");
            responseTask.Wait();
            var result = responseTask.Result;
            if (result.IsSuccessStatusCode)
            {
                var json = JsonConvert.DeserializeObject(result.Content.ReadAsStringAsync().Result).ToString();
                employee = JsonConvert.DeserializeObject<EmployeeJson>(json);
            }
            else
            {
                ModelState.AddModelError(string.Empty, "Server Error");
            }
            return Json(employee);
        }
    }
}