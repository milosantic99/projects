using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class Linker
    {
        [Key]
        public int id { get; set; }
        public Guid deviceId { get; set; }
        public Guid prosumerId { get; set; }
        public string prosumerDeviceName { get; set; }
        public bool work { get; set; }
        public bool control { get; set; }
        public bool access { get; set; }
        public bool simulation { get; set; }
    }
}
