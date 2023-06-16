namespace backend.Dtos
{
    public class TopThreeConsumersDto
    {
        public Guid deviceId { get; set; }
        public string deviceName { get; set; }
        public string type { get; set; }
        public bool status { get; set; }
        public double consumption { get; set; }

        public TopThreeConsumersDto(Guid deviceId, string deviceName, string type, bool status, double consumption)
        {
            this.deviceId = deviceId;
            this.deviceName = deviceName;
            this.type = type;
            this.status = status;
            this.consumption = consumption;
        }
    }
}
