using System;

namespace Service.Model
{
    public class CulvertGate : DbBase
    {
        public Nullable<System.DateTime> report_time { get; set; }
        public string reporter { get; set; }
        public string gate_name { get; set; }
        public string gate_location { get; set; }
        public string gate_river { get; set; }
        public string gate_type { get; set; }
        public Nullable<int> gate_holes_num { get; set; }
        public string gate_hole_size { get; set; }
        public string gate_bottom_height { get; set; }
        public string gate_top_height { get; set; }
        public string open_close_type { get; set; }
        public string overcurrent_capacity { get; set; }
        public Nullable<double> characteristic_level { get; set; }
        public Nullable<System.DateTime> danger_time { get; set; }
        public string danger_location { get; set; }
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
