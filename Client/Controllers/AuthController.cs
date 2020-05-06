using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Project_IAP.Models;

namespace Client.Controllers
{
    public class AuthController : Controller
    {
        [HttpGet]
        public IActionResult Login()
        {

            return View();
        }
        //[HttpPost]
        //public async Task<IActionResult> Login(User model)
        //{
        //    if (ModelState.IsValid)
        //    {
        //        var result = await _signManager.PasswordSignInAsync(model.Email,
        //           model.Password, false);

        //        if (result.Succeeded)
        //        {
        //            return RedirectToAction("Index", "Home");

        //        }
        //    }
        //    ModelState.AddModelError("", "Invalid login attempt");
        //    return View(model);
        //}
        public IActionResult Page404()
        {
            return View();
        }
    }
}