using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using OnboardingCRUD.Models;

namespace OnboardingCRUD.Controllers
{
    public class ProductsController : Controller
    {
        private TalentTaskEntities context = new TalentTaskEntities();

        public ActionResult Index()
        {
            return View();
        }

        #region getProducts
        public JsonResult GetProducts()
        {
            try
            {
                var productList = context.Products.ToList();
                return new JsonResult { Data = productList, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }
            catch (Exception e)
            {
                Console.Write(e.Data + "Exception Occured");
                return new JsonResult { Data = "Data Not Found", JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }
        }
        #endregion


        #region Delete
        public JsonResult DeleteProduct(int id)
        {
            try
            {
                var product = context.Products.Where(p => p.Id == id).SingleOrDefault();
                if (product != null)
                {
                    context.Products.Remove(product);
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


        #region createProduct
        public JsonResult CreateProduct(Product product)
        {
            try
            {
                context.Products.Add(product);
                context.SaveChanges();
            }
            catch (Exception e)
            {
                Console.Write(e.Data + "Exception Occured");
                return new JsonResult { Data = "Product Create Failed", JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }
            return new JsonResult { Data = "Success", JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }
        #endregion


        #region updateProduct
        public JsonResult GetUpdateProduct(int id)
        {
            try
            {
                Product product = context.Products.Where(p => p.Id == id).SingleOrDefault();
                return new JsonResult { Data = product, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }
            catch (Exception e)
            {
                Console.Write(e.Data + "Exception Occured");
                return new JsonResult { Data = "Product Not Found", JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }
        }

        public JsonResult UpdateProduct(Product product)
        {
            try
            {
                Product prod = context.Products.Where(p => p.Id == product.Id).SingleOrDefault();
                prod.Name = product.Name;
                prod.Price = product.Price;
                context.SaveChanges();
            }
            catch (Exception e)
            {
                Console.Write(e.Data + "Exception Occured");
                return new JsonResult { Data = "Product Update Failed", JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }
            return new JsonResult { Data = "Success", JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }
        #endregion
    }
}