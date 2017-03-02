using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Newtonsoft.Json;
using Service;

namespace Web.Controllers
{
    public class ReservoirController : Controller
    {
        private ReservoirSvr svr = new ReservoirSvr();

        public string Save(string json)
        {
            return JsonConvert.SerializeObject(svr.Save(json));
        }
    }
}
