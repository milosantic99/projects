namespace backend.Dtos
{
    public class DeviceDtoForMyDevicesPage
    {
        public Guid deviceId { get; set; }
        public int linkerId { get; set; }
        public string name { get; set; }
        public string originalName { get; set; }
        public string type { get; set; }
        public string subType { get; set; }
        public string image { get; set; }
        public bool status { get; set; }
        public double consumption { get; set; }
        public int percent { get; set; }

        public DeviceDtoForMyDevicesPage(Guid deviceId, int linkerId, string name, string originalName, string type, string subType, string image, bool status, double consumption, int percent)
        {
            this.deviceId = deviceId;
            this.linkerId = linkerId;
            this.name = name;
            this.originalName = originalName;
            this.type = type;
            this.subType = subType;
            this.image = image;
            this.status = status;
            this.consumption = consumption;
            this.percent = percent;
        }
    }
}
