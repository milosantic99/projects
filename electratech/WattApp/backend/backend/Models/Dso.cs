using backend.Enums;
using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class Dso
    {
        [Key]
        public Guid id { get; set; }
        public string companyName { get; set; }
        public string ownerFirstName { get; set; }
        public string ownerLastName { get; set; }
        public string address { get; set; }
        public string email { get; set; }
        public string password { get; set; }
        public string token { get; set; }
        public RoleName role { get; set; }
        public string image { get; set; }
    }
}
