using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using OnboardingCRUD.Models;

namespace OnboardingCRUD.Controllers
{
    public class SalesController : Controller
    {
        private TalentTaskEntities context = new TalentTaskEntities();
        // GET: Sales
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult GetSales()
        {
            try
            {
                var sList = context.Sales.Select(s => new
                {
                    Id = s.Id,
                    DateSold = s.DateSold,
                    CustomerName = s.Customer.Name,
                    ProductName = s.Product.Name,
                    StoreName = s.Store.Name
                }).ToList();

                return new JsonResult { Data = sList, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }
            catch (Exception e)
            {
                Console.Write(e.Data + "Exception error!");

                return new JsonResult { Data = "data not found", JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }
        }

        public JsonResult GetCustomers()
        {
            try
            {
                var CustomerData = context.Customers.Select(c => new
                {
                    Id = c.Id,
                    CustomerName = c.Name
                }).ToList();

                return new JsonResult { Data = CustomerData, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }
            catch (Exception e)
            {
                Console.Write(e.Data + "excetion error!");

                return new JsonResult { Data = "data not found", JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }
        }

        public JsonResult GetProducts()
        {
            try
            {
                var ProductData = context.Products.Select(p => new
                {
                    Id = p.Id,
                    ProductName = p.Name
                }).ToList();

                return new JsonResult { Data = ProductData, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }
            catch (Exception e)
            {
                Console.Write(e.Data + "exception error!");

                return new JsonResult { Data = "data not found", JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }
        }

        public JsonResult GetStores()
        {
            try
            {
                var StoresData = context.Stores.Select(s => new { Id = s.Id, StoreName = s.Name }).ToList();

                return new JsonResult { Data = StoresData, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }
            catch (Exception e)
            {
                Console.Write(e.Data + "Exception Occured");
                return new JsonResult { Data = "Data Not Found", JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }
        }

        #region Delete
        public JsonResult DeleteSale(int id)
        {
            try
            {
                var sale = context.Sales.Where(s => s.Id == id).SingleOrDefault();
                if (sale != null)
                {
                    context.Sales.Remove(sale);
                    context.SaveChanges();
                }
            }
            catch (Exception e)
            {
                Console.Write(e.Data + "Exception Occured");
                return new JsonResult { Data = "Deletion Falied", JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }
            return new JsonResult { Data = "Success", JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }
        #endregion

        #region Create
        public JsonResult CreateSale(Sale sale)
        {
            try
            {
                context.Sales.Add(sale);
                context.SaveChanges();
            }
            catch (Exception e)
            {
                Console.Write(e.Data + "Exception Occured");
                return new JsonResult { Data = "Sale Create Failed", JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }
            return new JsonResult { Data = "Success", JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }
        #endregion

        #region saleUpdate
        public JsonResult GetUpdateSale(int id)
        {
            try
            {
                Sale sale = context.Sales.Where(s => s.Id == id).SingleOrDefault();
                return new JsonResult { Data = sale, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }
            catch (Exception e)
            {
                Console.Write(e.Data + "Exception Occured");
                return new JsonResult { Data = "Sale Not Found", JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }
        }

        public JsonResult UpdateSale(Sale sale)
        {
            try
            {
                Sale sa = context.Sales.Where(s => s.Id == sale.Id).SingleOrDefault();
                sa.CustomerId = sale.CustomerId;
                sa.ProductId = sale.ProductId;
                sa.StoreId = sale.StoreId;
                sa.DateSold = sale.DateSold;

                context.SaveChanges();
            }
            catch (Exception e)
            {
                Console.Write(e.Data + "Exception Occured");
                return new JsonResult { Data = "Sale Update Failed", JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }
            return new JsonResult { Data = "Success", JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }
        #endregion

    }
}