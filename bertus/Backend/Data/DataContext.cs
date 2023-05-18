using Bertus_Igrannonica.Models;
using Microsoft.EntityFrameworkCore;

namespace Bertus_Igrannonica.Data {
    public class DataContext : DbContext {

        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<Student> Student { get; set; }
    }
}
