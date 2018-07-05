using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Shop.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            Boolean res;
            string constring = System.Configuration.ConfigurationManager.ConnectionStrings["ShopContext"].ConnectionString;

            using (SqlConnection connection = new SqlConnection(constring))
            {
                try
                {
                    connection.Open();
                    res = true;
                }
                catch (SqlException)
                {
                    res = false;
                }
            }
            return View(res);
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}