using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Project_IAP.Models;

namespace Client.Controllers
{
    public class CompanyController : Controller
    {
        private HttpClient client = new HttpClient
        {
            BaseAddress = new Uri("https://localhost:44379/api/")
        };

        public IActionResult Index()
        {
            //var role = HttpContext.Session.GetString("Role");
            //if (role == "Admin")
            //{
            //}
            //else
            //{
            //    return RedirectToAction("notfound", "Auth");
            //}
                return View(LoadCompany());
        }
        public JsonResult LoadCompany()
        {
            //client.DefaultRequestHeaders.Add("Authorization", HttpContext.Session.GetString("JWTToken"));
            CompanyJson company = null;
            var responseTask = client.GetAsync("Company");
            responseTask.Wait();
            var result = responseTask.Result;
            if (result.IsSuccessStatusCode)
            {
                var json = JsonConvert.DeserializeObject(result.Content.ReadAsStringAsync().Result).ToString();
                company = JsonConvert.DeserializeObject<CompanyJson>(json);
            }
            else
            {
                ModelState.AddModelError(string.Empty, "Server Error");
            }
            return Json(company);
        }

        public JsonResult InsertOrUpdate(Company company)
        {
            //client.DefaultRequestHeaders.Add("Authorization", HttpContext.Session.GetString("JWTToken"));
            var myContent = JsonConvert.SerializeObject(company);
            var buffer = System.Text.Encoding.UTF8.GetBytes(myContent);
            var byteContent = new ByteArrayContent(buffer);
            byteContent.Headers.ContentType = new MediaTypeHeaderValue("application/json");
            if (company.Id.Equals(0))
            {
                var result = client.PostAsync("Company/", byteContent).Result;
                return Json(result);
            }
            else
            {
                var result = client.PutAsync("Company/" + company.Id, byteContent).Result;
                return Json(result);
            }
        }
        public JsonResult GetById(int Id)
        {
            //client.DefaultRequestHeaders.Add("Authorization", HttpContext.Session.GetString("JWTToken"));
            Company company = null;
            var responseTask = client.GetAsync("Company/" + Id);
            responseTask.Wait();
            var result = responseTask.Result;
            if (result.IsSuccessStatusCode)
            {
                var json = JsonConvert.DeserializeObject(result.Content.ReadAsStringAsync().Result).ToString();
                company = JsonConvert.DeserializeObject<Company>(json);
            }
            else
            {
                ModelState.AddModelError(string.Empty, "server error, try after some time");
            }
            return Json(company);
        }
        public JsonResult Delete(int Id)
        {
            //client.DefaultRequestHeaders.Add("Authorization", HttpContext.Session.GetString("JWTToken"));
            var result = client.DeleteAsync("Company/" + Id).Result;
            return Json(result);
        }
    }
}