using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Project_IAP.ViewModels
{
    public class ContractVM
    {
        public int Id { get; set; }
        public string EmployeeName { get; set; }
        public string Title { get; set; }
        public string Division { get; set; }
        public string JobDesk { get; set; }
        public DateTime InterviewDate { get; set; }
        public string Address { get; set; }
        public string Gender { get; set; }
        public string Experience { get; set; }
        public string Education { get; set; }
        public string Description { get; set; }
        public string DescriptionInterview { get; set; }
        public int CompanyId { get; set; }
        public string CompanyName { get; set; }
        public string Email { get; set; }
    }
}
