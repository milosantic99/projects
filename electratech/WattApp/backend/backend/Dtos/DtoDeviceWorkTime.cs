namespace backend.Dtos
{
    public class DtoDeviceWorkTime
    {
        public Guid id { get; set; }
        public double consumption { get; set; }
        public string hour { get; set; }

        public DtoDeviceWorkTime(Guid id, double consumption, string hour)
        {
            this.id = id;
            this.consumption = consumption;
            this.hour = hour;
        }
    }
}
