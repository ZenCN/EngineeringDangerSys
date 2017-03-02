using System;

namespace Service.Model
{
    public class WaterCrisis : DbBase
    {
        public Nullable<System.DateTime> report_time { get; set; }
        public string reporter { get; set; }
        public Nullable<System.DateTime> occurrence_time { get; set; }
        public string occurrence_place { get; set; }
        public string rainfall_flood_regime { get; set; }
        public string impact_on_downstream { get; set; }
        public string danger_brief_introduction { get; set; }
        public string accident_causes { get; set; }
        public string emergency_situation { get; set; }
        public string reatment_measures { get; set; }
    }
}
