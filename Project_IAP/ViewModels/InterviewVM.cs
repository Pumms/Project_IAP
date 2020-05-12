using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace Project_IAP.ViewModels
{
    public class InterviewVM
    {
        public int Id { get; set; }
        public int CompanyId { get; set; }
        public string CompanyName { get; set; }
        public string Title { get; set; }
        public string Division { get; set; }
        public string JobDesk { get; set; }
        public DateTime InterviewDate { get; set; }
        public string Address { get; set; }
        public string Gender { get; set; }
        public string Experience { get; set; }
        public string LastEducation { get; set; }
        public string Description { get; set; }
        public string AddressInterview { get; set; }
    }

    public class CompanyJson
    {
        [JsonProperty("data")]
        public IList<InterviewVM> data { get; set; }
    }
}
