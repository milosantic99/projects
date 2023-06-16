namespace backend.Dtos
{
    public class ProsumerDevicesConsumptionNowDto
    {
        public Guid prosumerId { get; set; }
        public string prosumerName { get; set; }
        public string prosumerLastName { get; set; }
        public int consumption { get; set; }
        public int workDevices { get; set; }
        public int allDevices { get; set; }
        public double x { get; set; }
        public double y { get; set; }

        public ProsumerDevicesConsumptionNowDto(Guid prosumerId, string prosumerName, string prosumerLastName, int consumption, int workDevices, int allDevices, double x, double y)
        {
            this.prosumerId = prosumerId;
            this.prosumerName = prosumerName;
            this.prosumerLastName = prosumerLastName;
            this.consumption = consumption;
            this.workDevices = workDevices;
            this.allDevices = allDevices;
            this.x = x;
            this.y = y;
        }
    }
}
