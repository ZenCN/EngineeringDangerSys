using System;

namespace Service.Model
{
    public class Dike : DbBase
    {
        public Nullable<System.DateTime> report_time { get; set; }
        public string reporter { get; set; }
        public string dike_name { get; set; }
        public string dike_location { get; set; }
        public string dike_river { get; set; }
        public string dike_level { get; set; }
        public Nullable<double> warning_level { get; set; }
        public Nullable<double> guaranteed_level { get; set; }
        public string dike_top_height { get; set; }
        public string dike_height { get; set; }
        public string cross_section { get; set; }
        public Nullable<System.DateTime> danger_time { get; set; }
        public string danger_location { get; set; }
        public string danger_range { get; set; }
        public string danger_type { get; set; }
        public Nullable<double> river_level { get; set; }
        public string river_discharge { get; set; }
        public string rainfall_flood_regime { get; set; }
        public string impact_on_downstream { get; set; }
        public string danger_brief_introduction { get; set; }
        public string accident_causes { get; set; }
        public string emergency_situation { get; set; }
        public string reatment_measures { get; set; }
    }
}
