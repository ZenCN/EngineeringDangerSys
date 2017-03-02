using System.Data.Entity;

namespace Service.Model
{
    public class Db : DbContext
    {
        public Db()
            : base("name=db_context")
        {
        }

        public DbSet<CulvertGate> culvert_gates { get; set; }
        public DbSet<Dike> dikes { get; set; }  //对应数据库dikes表，注意要用复数
        public DbSet<Reservoir> reservoirs { get; set; }  //对应数据库reservoirs表，注意要用复数
        public DbSet<SuddenDisaster> sudden_disaster { get; set; }  //非名词可不用复数，对应数据库sudden_disaster表
        public DbSet<WaterCrisis> water_crisis { get; set; }  
    }
}
