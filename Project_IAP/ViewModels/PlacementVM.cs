using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Project_IAP.ViewModels
{
    public class PlacementVM
    {
        public int Id { get; set; }
        public int EmployeeId { get; set; }
        public string EmployeeName { get; set; }
        public string Gender { get; set; }
        public string Title { get; set; }
        public string Division { get; set; }
        public string JobDesk { get; set; }
        public DateTime InterviewDate { get; set; }
        public string Address { get; set; }
        public string CompanyName { get; set; }
        public string Email { get; set; }
        public string DescriptionInterview { get; set; }
        public Nullable<DateTime> StartContract { get; set; }
        public Nullable<DateTime> EndContract { get; set; }
        public int Status { get; set; }
    }
    public class PlacementJson
    {
        [JsonProperty("data")]
        public IList<PlacementVM> data { get; set; }
    }
}
