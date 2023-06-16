using System.Security.Cryptography.X509Certificates;

namespace backend.Dtos
{
    public class NotificationDto
    {
        public int notificationId { get; set; }
        public string notificationType { get; set; }
        public Guid prosumerId { get; set; }
        public string prosumerName { get; set; }
        public string imageUrl { get; set; }

        public NotificationDto(int notificationId, string notificationType, Guid prosumerId, string prosumerName, string imageUrl)
        {
            this.notificationId = notificationId;
            this.notificationType = notificationType;
            this.prosumerName = prosumerName;
            this.imageUrl = imageUrl;
            this.prosumerId = prosumerId;
        }
    }
}
