using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class devicetable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "devices",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "TEXT", nullable: false),
                    type = table.Column<string>(type: "TEXT", nullable: false),
                    subType = table.Column<string>(type: "TEXT", nullable: false),
                    manufacturer = table.Column<string>(type: "TEXT", nullable: false),
                    model = table.Column<string>(type: "TEXT", nullable: false),
                    consumption = table.Column<double>(type: "REAL", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_devices", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "dsos",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "TEXT", nullable: false),
                    companyName = table.Column<string>(type: "TEXT", nullable: false),
                    ownerFirstName = table.Column<string>(type: "TEXT", nullable: false),
                    ownerLastName = table.Column<string>(type: "TEXT", nullable: false),
                    address = table.Column<string>(type: "TEXT", nullable: false),
                    email = table.Column<string>(type: "TEXT", nullable: false),
                    password = table.Column<string>(type: "TEXT", nullable: false),
                    token = table.Column<string>(type: "TEXT", nullable: false),
                    role = table.Column<int>(type: "INTEGER", nullable: false),
                    image = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_dsos", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "linkers",
                columns: table => new
                {
                    id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    deviceId = table.Column<Guid>(type: "TEXT", nullable: false),
                    prosumerId = table.Column<Guid>(type: "TEXT", nullable: false),
                    prosumerDeviceName = table.Column<string>(type: "TEXT", nullable: false),
                    work = table.Column<bool>(type: "INTEGER", nullable: false),
                    control = table.Column<bool>(type: "INTEGER", nullable: false),
                    access = table.Column<bool>(type: "INTEGER", nullable: false),
                    simulation = table.Column<bool>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_linkers", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "notifications",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    dsoId = table.Column<Guid>(type: "TEXT", nullable: false),
                    prosumerId = table.Column<Guid>(type: "TEXT", nullable: false),
                    notificationType = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_notifications", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "prosumers",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "TEXT", nullable: false),
                    firstName = table.Column<string>(type: "TEXT", nullable: false),
                    lastName = table.Column<string>(type: "TEXT", nullable: false),
                    email = table.Column<string>(type: "TEXT", nullable: false),
                    password = table.Column<string>(type: "TEXT", nullable: false),
                    token = table.Column<string>(type: "TEXT", nullable: false),
                    role = table.Column<int>(type: "INTEGER", nullable: false),
                    idDso = table.Column<Guid>(type: "TEXT", nullable: false),
                    image = table.Column<string>(type: "TEXT", nullable: false),
                    city = table.Column<string>(type: "TEXT", nullable: false),
                    address = table.Column<string>(type: "TEXT", nullable: false),
                    phoneNumber = table.Column<string>(type: "TEXT", nullable: false),
                    simulation = table.Column<bool>(type: "INTEGER", nullable: false),
                    x = table.Column<double>(type: "REAL", nullable: false),
                    y = table.Column<double>(type: "REAL", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_prosumers", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "records",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "TEXT", nullable: false),
                    timeStamp = table.Column<int>(type: "INTEGER", nullable: false),
                    date = table.Column<DateTime>(type: "TEXT", nullable: false),
                    deviceId = table.Column<Guid>(type: "TEXT", nullable: false),
                    prosumerId = table.Column<Guid>(type: "TEXT", nullable: false),
                    currentConsumption = table.Column<double>(type: "REAL", nullable: false),
                    prediction = table.Column<double>(type: "REAL", nullable: false),
                    simulaiton = table.Column<bool>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_records", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "recordStatus",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "TEXT", nullable: false),
                    deviceId = table.Column<Guid>(type: "TEXT", nullable: false),
                    prosumerId = table.Column<Guid>(type: "TEXT", nullable: false),
                    currentConsumption = table.Column<double>(type: "REAL", nullable: false),
                    startDate = table.Column<DateTime>(type: "TEXT", nullable: false),
                    endDate = table.Column<DateTime>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_recordStatus", x => x.id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "devices");

            migrationBuilder.DropTable(
                name: "dsos");

            migrationBuilder.DropTable(
                name: "linkers");

            migrationBuilder.DropTable(
                name: "notifications");

            migrationBuilder.DropTable(
                name: "prosumers");

            migrationBuilder.DropTable(
                name: "records");

            migrationBuilder.DropTable(
                name: "recordStatus");
        }
    }
}
