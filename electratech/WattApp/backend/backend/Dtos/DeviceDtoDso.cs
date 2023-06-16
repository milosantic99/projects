namespace backend.Dtos
{
    public class DeviceDtoDso
    {
        public Guid deviceId { get; set; }
        public string type { get; set; }
        public string Normal { get; set; }
        public string Max { get; set; }
        public bool access { get; set; }
        public bool control { get; set; }
        public bool work { get; set; }

        public DeviceDtoDso(Guid deviceId, string type, string normal, string max, bool access, bool control, bool work)
        {
            this.deviceId = deviceId;
            this.type = type;
            Normal = normal;
            Max = max;
            this.access = access;
            this.control = control;
            this.work = work;
        }
    }
}
