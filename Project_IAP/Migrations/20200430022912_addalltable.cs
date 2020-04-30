using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Project_IAP.Migrations
{
    public partial class addalltable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "TB_M_BootCamp",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Batch = table.Column<string>(nullable: true),
                    Class = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TB_M_BootCamp", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TB_M_Company",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(nullable: true),
                    Address = table.Column<string>(nullable: true),
                    PhoneNumber = table.Column<string>(nullable: true),
                    Email = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TB_M_Company", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TB_M_Employee",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    FirstName = table.Column<string>(nullable: true),
                    LastName = table.Column<string>(nullable: true),
                    Address = table.Column<string>(nullable: true),
                    BirthDate = table.Column<DateTime>(nullable: false),
                    Religion = table.Column<string>(nullable: true),
                    PhoneNumber = table.Column<string>(nullable: true),
                    WorkStatus = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TB_M_Employee", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TB_M_Role",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TB_M_Role", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TB_M_User",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Email = table.Column<string>(nullable: true),
                    Password = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TB_M_User", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TB_T_Interview",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CompanyId = table.Column<int>(nullable: false),
                    Title = table.Column<string>(nullable: true),
                    Division = table.Column<string>(nullable: true),
                    JobDesk = table.Column<string>(nullable: true),
                    InterviewDate = table.Column<DateTime>(nullable: false),
                    Address = table.Column<string>(nullable: true),
                    Gender = table.Column<string>(nullable: true),
                    Experience = table.Column<string>(nullable: true),
                    Education = table.Column<string>(nullable: true),
                    DescriptionAddress = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TB_T_Interview", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TB_T_Interview_TB_M_Company_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "TB_M_Company",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TB_T_BCEmployee",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    EmployeeId = table.Column<int>(nullable: false),
                    BootCampId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TB_T_BCEmployee", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TB_T_BCEmployee_TB_M_BootCamp_BootCampId",
                        column: x => x.BootCampId,
                        principalTable: "TB_M_BootCamp",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TB_T_BCEmployee_TB_M_Employee_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "TB_M_Employee",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TB_T_Replacement",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    EmployeeId = table.Column<int>(nullable: false),
                    ReplacementReason = table.Column<string>(nullable: true),
                    Detail = table.Column<string>(nullable: true),
                    Confirmation = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TB_T_Replacement", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TB_T_Replacement_TB_M_Employee_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "TB_M_Employee",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TB_T_UserRole",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    UserId = table.Column<int>(nullable: false),
                    RoleId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TB_T_UserRole", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TB_T_UserRole_TB_M_Role_RoleId",
                        column: x => x.RoleId,
                        principalTable: "TB_M_Role",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TB_T_UserRole_TB_M_User_UserId",
                        column: x => x.UserId,
                        principalTable: "TB_M_User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TB_T_Contract",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    EmployeeId = table.Column<int>(nullable: false),
                    InterviewId = table.Column<int>(nullable: false),
                    StartContract = table.Column<DateTime>(nullable: true),
                    EndContract = table.Column<DateTime>(nullable: true),
                    ConfirmationEmp = table.Column<bool>(nullable: true),
                    ConfirmationCompany = table.Column<bool>(nullable: true),
                    Status = table.Column<bool>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TB_T_Contract", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TB_T_Contract_TB_M_Employee_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "TB_M_Employee",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TB_T_Contract_TB_T_Interview_InterviewId",
                        column: x => x.InterviewId,
                        principalTable: "TB_T_Interview",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_TB_T_BCEmployee_BootCampId",
                table: "TB_T_BCEmployee",
                column: "BootCampId");

            migrationBuilder.CreateIndex(
                name: "IX_TB_T_BCEmployee_EmployeeId",
                table: "TB_T_BCEmployee",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_TB_T_Contract_EmployeeId",
                table: "TB_T_Contract",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_TB_T_Contract_InterviewId",
                table: "TB_T_Contract",
                column: "InterviewId");

            migrationBuilder.CreateIndex(
                name: "IX_TB_T_Interview_CompanyId",
                table: "TB_T_Interview",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_TB_T_Replacement_EmployeeId",
                table: "TB_T_Replacement",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_TB_T_UserRole_RoleId",
                table: "TB_T_UserRole",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "IX_TB_T_UserRole_UserId",
                table: "TB_T_UserRole",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TB_T_BCEmployee");

            migrationBuilder.DropTable(
                name: "TB_T_Contract");

            migrationBuilder.DropTable(
                name: "TB_T_Replacement");

            migrationBuilder.DropTable(
                name: "TB_T_UserRole");

            migrationBuilder.DropTable(
                name: "TB_M_BootCamp");

            migrationBuilder.DropTable(
                name: "TB_T_Interview");

            migrationBuilder.DropTable(
                name: "TB_M_Employee");

            migrationBuilder.DropTable(
                name: "TB_M_Role");

            migrationBuilder.DropTable(
                name: "TB_M_User");

            migrationBuilder.DropTable(
                name: "TB_M_Company");
        }
    }
}
