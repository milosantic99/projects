using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class Notification
    {
        [Key]
        public int Id { get; set; }
        public Guid dsoId { get; set; }
        public Guid prosumerId { get; set; }
        public string notificationType { get; set; }
    }
}
