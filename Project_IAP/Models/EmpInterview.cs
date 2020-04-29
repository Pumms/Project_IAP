using Project_IAP.Base;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.Contracts;
using System.Linq;
using System.Threading.Tasks;

namespace Project_IAP.Models
{
    [Table("TB_T_EmpInterview")]
    public class EmpInterview
    {
        public int EmployeeId { get; set; }
        public virtual Employee Employee { get; set; }
        public int InterviewId { get; set; }
        public virtual Interview Interview { get; set; }
        public Nullable<bool> ConfirmationEmp { get; set; }
        public Nullable<bool> ConfirmationCompany { get; set; }
    }
}
