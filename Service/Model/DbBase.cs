using System;
using System.ComponentModel.DataAnnotations;

namespace Service.Model
{
    public abstract class DbBase
    {
        protected DbBase()
        {
            add_date = DateTime.Now;
            is_deleted = false;
            pageno = 0;
        }


        //EF的主键都是系统自动生成的，可能忽略掉显式赋的值
        [Key]
        public int pageno { get; set; }

        public DateTime add_date { get; set; }

        public bool is_deleted { get; set; }
    }
}
