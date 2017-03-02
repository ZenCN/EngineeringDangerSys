using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using Infrastructure.Operation;
using Newtonsoft.Json;
using Service.Model;

namespace Service
{
    public class ReservoirSvr : BaseSvr
    {
        public Result Save(string json)
        {
            try
            {
                Reservoir reservoir = JsonConvert.DeserializeObject<Reservoir>(json);

                if (reservoir != null)
                {
                    if (reservoir.pageno > 0)
                    {
                        db.Update(reservoir);
                    }
                    else
                    {
                        reservoir.pageno = GetMaxPageNo();
                        db.reservoirs.Add(reservoir);
                    }

                    if (Entity.SaveChanges(db) > 0)
                        return new Result(ResultType.success, reservoir.pageno.ToString());
                    else
                        return new Result(ResultType.no_changed);
                }
                else
                {
                    return new Result(ResultType.error, "反序列化后数据为空！");
                }
            }
            catch (Exception ex)
            {
                return new Result(ResultType.error, ex.Message);
            }
        }

        private int GetMaxPageNo()
        {
            int maxPageNo = 0;
            HttpApplicationState app = HttpContext.Current.Application;

            if (app["ReservoirMaxPageNo"] != null)
            {
                maxPageNo = Convert.ToInt32(app["ReservoirMaxPageNo"]); //返回之前未使用过的pageno
            }
            else
            {
                if (db.reservoirs.Any())
                {
                    maxPageNo = db.reservoirs.Max(t => t.pageno); //查找数据库中已存在的最大的pageno                   
                }
                maxPageNo++; //没有任何数据时，maxpageno为1，有的话，用找出来的最大页面再加1作为新的页号
            }

            app["ReservoirMaxPageNo"] = maxPageNo + 1; //加1，以准备下次使用，但不能用++maxPageNo，就算保存失败也要加1跳过

            return maxPageNo;
        }
    }
}
