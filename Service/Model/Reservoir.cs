using System;

namespace Service.Model
{
    public class Reservoir : DbBase
    {
        public Nullable<System.DateTime> report_time { get; set; }
        public string reporter { get; set; }
        public string reservoir_name { get; set; }
        public string reservoir_location { get; set; }
        public string reservoir_river { get; set; }
        public Nullable<System.DateTime> construction_time { get; set; }
        public Nullable<byte> is_danger { get; set; }
        public string competent_unit { get; set; }
        public Nullable<double> cumulonimbus_area { get; set; }
        public Nullable<double> total_capacity { get; set; }
        public string dam_type { get; set; }
        public string dam_top_height { get; set; }
        public string discharge_facilies { get; set; }
        public Nullable<double> discharge_capacity { get; set; }
        public Nullable<double> control_level { get; set; }
        public Nullable<double> check_level { get; set; }
        public Nullable<double> design_level { get; set; }
        public Nullable<System.DateTime> danger_time { get; set; }
        public string danger_location { get; set; }
        public string danger_type { get; set; }
        public Nullable<double> current_level { get; set; }
        public Nullable<double> water_storage { get; set; }
        public Nullable<double> flow_in_out { get; set; }
        public Nullable<double> downstream_discharge { get; set; }
        public string rainfall_flood_regime { get; set; }
        public string impact_on_downstream { get; set; }
        public string danger_brief_introduction { get; set; }
        public string accident_causes { get; set; }
        public string emergency_situation { get; set; }
        public string reatment_measures { get; set; }
    }
}
