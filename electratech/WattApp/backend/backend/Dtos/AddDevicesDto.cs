namespace backend.Dtos
{
    public class AddDevicesDto
    {
        public Guid deviceId { get; set; }
        public string type { get; set; }
        public string manufacturer { get; set; }
        public string model { get; set; }

        public AddDevicesDto(Guid deviceId, string type, string manufacturer, string model)
        {
            this.deviceId = deviceId;
            this.type = type;
            this.manufacturer = manufacturer;
            this.model = model;
        }
    }
}
