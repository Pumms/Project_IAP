using Project_IAP.Base;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Project_IAP.Models
{
    [Table("TB_T_Placement")]
    public class Placement : IEntity
    {
        [Key]
        public int Id { get; set; }
        public int EmployeeId { get; set; }
        public virtual Employee Employee { get; set; }
        public int InterviewId { get; set; }
        public virtual Interview Interview { get; set; }
        public Nullable<bool> ConfirmationEmp { get; set; }
        public Nullable<bool> ConfirmationCompany { get; set; }
        public Nullable<DateTime> StartContract { get; set; }
        public Nullable<DateTime> EndContract { get; set; }
        public Nullable<bool> Status { get; set; }
    }
}
