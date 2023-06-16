using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class new_table : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "deviceId",
                table: "recordStatus");

            migrationBuilder.DropColumn(
                name: "prosumerId",
                table: "recordStatus");

            migrationBuilder.DropColumn(
                name: "deviceId",
                table: "records");

            migrationBuilder.DropColumn(
                name: "prosumerId",
                table: "records");

            migrationBuilder.AddColumn<int>(
                name: "linkerId",
                table: "recordStatus",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "linkerId",
                table: "records",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "autoTurnOnOffs",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "TEXT", nullable: false),
                    linkerId = table.Column<int>(type: "INTEGER", nullable: false),
                    dateOn = table.Column<DateTime>(type: "TEXT", nullable: false),
                    dateOff = table.Column<DateTime>(type: "TEXT", nullable: false),
                    timeOn = table.Column<int>(type: "INTEGER", nullable: false),
                    timeOff = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_autoTurnOnOffs", x => x.id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "autoTurnOnOffs");

            migrationBuilder.DropColumn(
                name: "linkerId",
                table: "recordStatus");

            migrationBuilder.DropColumn(
                name: "linkerId",
                table: "records");

            migrationBuilder.AddColumn<Guid>(
                name: "deviceId",
                table: "recordStatus",
                type: "TEXT",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "prosumerId",
                table: "recordStatus",
                type: "TEXT",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "deviceId",
                table: "records",
                type: "TEXT",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "prosumerId",
                table: "records",
                type: "TEXT",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));
        }
    }
}
