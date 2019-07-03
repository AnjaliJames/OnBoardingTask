using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using OnboardingCRUD.Models;

namespace OnboardingCRUD.Controllers
{
    public class StoresController : Controller
    {
        private TalentTaskEntities context = new TalentTaskEntities();
        // GET: Stores
        public ActionResult Index()
        {
            return View();
        }

        #region getStore
        public JsonResult GetStores()
        {
            try
            {
                var storeList = context.Stores.ToList();
                return new JsonResult { Data = storeList, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }
            catch (Exception e)
            {
                Console.Write(e.Data + "Exception Occured");
                return new JsonResult { Data = "Data Not Found", JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }
        }
        #endregion

        #region Delete
        public JsonResult DeleteStore(int id)
        {
            try
            {
                var store = context.Stores.Where(s => s.Id == id).SingleOrDefault();
                if (store != null)
                {
                    context.Stores.Remove(store);
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


        #region CreateStore
        public JsonResult CreateStore(Store store)
        {
            try
            {
                context.Stores.Add(store);
                context.SaveChanges();
            }
            catch (Exception e)
            {
                Console.Write(e.Data + "Exception Occured");
                return new JsonResult { Data = "Store Create Failed", JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }
            return new JsonResult { Data = "Success", JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }
        #endregion

        #region Update
        public JsonResult GetUpdateStore(int id)
        {
            try
            {
                Store store = context.Stores.Where(s => s.Id == id).SingleOrDefault();
                return new JsonResult { Data = store, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }
            catch (Exception e)
            {
                Console.Write(e.Data + "Exception Occured");
                return new JsonResult { Data = "Store Not Found", JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }
        }

        public JsonResult UpdateStore(Store store)
        {
            try
            {
                Store st = context.Stores.Where(s => s.Id == store.Id).SingleOrDefault();
                st.Name = store.Name;
                st.Address = store.Address;
                context.SaveChanges();
            }
            catch (Exception e)
            {
                Console.Write(e.Data + "Exception Occured");
                return new JsonResult { Data = "Store Update Failed", JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }
            return new JsonResult { Data = "Success", JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }
        #endregion
    }
}