using Project_IAP.Base;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Project_IAP.Models
{
    [Table("TB_M_Employee")]
    public class Employee : IEntity
    {
        [Key]
        public int Id { get; set; }
        public int BootCampId { get; set; }
        public virtual BootCamp BootCamp { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Address { get; set; }
        public DateTime BirthDate { get; set; }
        public string Religion { get; set; }
        public string PhoneNumber { get; set; }
        public string Telphone { get; set; }
        public string Gender { get; set; }
        public string Experience { get; set; }
        public string LastEducation { get; set; }
        public bool WorkStatus { get; set; }
    }
}
