using backend.Enums;
using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class Prosumer
    {
        [Key]
        public Guid id { get; set; }
        public string firstName { get; set; }
        public string lastName { get; set; }
        public string email { get; set; }
        public string password { get; set; }
        public string token { get; set; }
        public RoleName role { get; set; }
        public Guid idDso { get; set; }
        public string image { get; set; }
        public string city { get; set; }
        public string address { get; set; }
        public string phoneNumber { get; set; }
        public bool simulation { get; set; }
        public double x { get; set; }
        public double y { get; set; }
    }
}
