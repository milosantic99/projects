using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Data
{
    public class WattAppDBContext : DbContext
    {
        private DbContextOptionsBuilder<WattAppDBContext> optionsBuilder;

        public WattAppDBContext(DbContextOptions options) : base(options)
        {
        }

        public WattAppDBContext()
        {
            
        }

        public DbSet<Dso> dsos { get; set; }
        public DbSet<Prosumer> prosumers { get; set; }
        public DbSet<Linker> linkers { get; set; }
        public DbSet<Record> records { get; set; }
        public DbSet<Device> devices { get; set; }
        public DbSet<Notification> notifications { get; set; }
        public DbSet<RecordStatus> recordStatus { get; set; }
        public DbSet<AutoTurnOnOff> autoTurnOnOffs { get; set; }
    }
}