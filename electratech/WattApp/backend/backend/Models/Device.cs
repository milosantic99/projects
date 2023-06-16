using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class Device
    {
        [Key]
        public Guid id { get; set; }
        public string type { get; set; } //type->mesto
        public string subType { get; set; } //vrsta uredjaja zapravo
        public string manufacturer { get; set; }
        public string model { get; set; }
        public double consumption { get; set; }
    }
}
