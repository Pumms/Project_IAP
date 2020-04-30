using Project_IAP.Base;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Project_IAP.Models
{
    [Table("TB_T_BCEmployee")]
    public class BCEmployee : IEntity
    {
        [Key]
        public int Id { get; set; }
        public int EmployeeId { get; set; }
        public virtual Employee Employee { get; set; }
        public int BootCampId { get; set; }
        public virtual BootCamp BootCamp { get; set; }
    }
}
