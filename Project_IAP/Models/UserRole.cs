using Project_IAP.Base;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Security.Policy;
using System.Threading.Tasks;

namespace Project_IAP.Models
{
    [Table("TB_T_UserRole")]
    public class UserRole
    {
        [Key]
        public int Id { get; set; }
        public int UserId { get; set; }
        public virtual User User { get; set; }
        public int RoleId { get; set; }
        public virtual Role Role { get; set; }
    }
}
