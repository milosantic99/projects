namespace backend.Dtos
{
    public class DeviceDtoProsumer
    {
        public int linkerId { get; set; }
        public Guid deviceId { get; set; }
        public string type { get; set; }
        public string manufacturer { get; set; }
        public string model { get; set; }
        public double consumption { get; set; }
        public double production { get; set; }
        public bool access { get; set; }
        public bool control { get; set; }
        public bool work { get; set; }

        public DeviceDtoProsumer(int linkerId ,Guid deviceId, string type, string manufacturer, string model, double consumption, double production, bool access, bool control, bool work)
        {
            this.linkerId = linkerId;
            this.deviceId = deviceId;
            this.type = type;
            this.manufacturer = manufacturer;
            this.model = model;
            this.consumption = consumption;
            this.production = production;
            this.access = access;
            this.control = control;
            this.work = work;
        }
    }
}
