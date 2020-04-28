using Project_IAP.Base;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Project_IAP.Models
{
    [Table("TB_M_Replacement")]
    public class Replacement : IEntity
    {
        [Key]
        public int Id { get; set; }
        public int EmployeeId { get; set; }
        public virtual Employee Employee { get; set; }
        public string ReplacementReason { get; set; }
        public string Detail { get; set; }
        public bool Confirmation { get; set; }
    }
}
