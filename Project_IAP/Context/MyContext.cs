using Microsoft.EntityFrameworkCore;
using Project_IAP.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;

namespace Project_IAP.Context
{
    public class MyContext : DbContext
    {
        public MyContext(DbContextOptions<MyContext> options) : base(options) { }
        public DbSet<Company> company { get; set; }
        public DbSet<EmpInterview> empinterview { get; set; }
        public DbSet<Employee> employee { get; set; }
        public DbSet<Interview> interview { get; set; }
        public DbSet<Replacement> replacement { get; set; }
        public DbSet<Role> role { get; set; }
        public DbSet<User> user { get; set; }
        public DbSet<UserRole> userrole { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserRole>().HasKey(x => new { x.UserId, x.RoleId });
            modelBuilder.Entity<UserRole>()
                .HasOne(x => x.User)
                .WithMany(x => x.UserRoles)
                .HasForeignKey(x => x.UserId);

            modelBuilder.Entity<UserRole>()
                .HasOne(x => x.Role)
                .WithMany(x => x.UserRoles)
                .HasForeignKey(x => x.RoleId);

            modelBuilder.Entity<EmpInterview>().HasKey(x => new { x.EmployeeId, x.InterviewId });
            modelBuilder.Entity<EmpInterview>()
                .HasOne(x => x.Employee)
                .WithMany(x => x.EmpInterviews)
                .HasForeignKey(x => x.EmployeeId);
            
            modelBuilder.Entity<EmpInterview>()
                .HasOne(x => x.Interview)
                .WithMany(x => x.EmpInterviews)
                .HasForeignKey(x => x.InterviewId);

        }
    }
}
