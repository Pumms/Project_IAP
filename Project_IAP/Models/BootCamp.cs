using Project_IAP.Base;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Project_IAP.Models
{
    [Table("TB_M_BootCamp")]
    public class BootCamp : IEntity
    {
        [Key]
        public int Id { get; set; }
        public string Batch { get; set; }
        public string Class { get; set; }
    }
}
