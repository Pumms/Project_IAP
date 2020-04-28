using Project_IAP.Base;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Project_IAP.Models
{
    [Table("TB_T_Interview")]
    public class Interview : IEntity
    {
        [Key]
        public int Id { get; set; }
        public int CompanyId { get; set; }
        public virtual Company Company { get; set; }
        public string Title { get; set; }
        public string Division { get; set; }
        public string JobDesk { get; set; }
        public DateTime InterviewDate { get; set; }
        public string Address { get; set; }
        public string Description { get; set; }
        public bool ConfirmClient { get; set; }

    }
}
