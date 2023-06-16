namespace backend.Dtos
{
    public class DtoDeviceSort
    {
        public Guid id { get; set; }
        public double sumConsumption { get; set; }
        public string type { get; set; }
        public string manufacturer { get; set; }
        public string model { get; set; }
        public double consumption { get; set; }

        public DtoDeviceSort(Guid id, double sumConsumption, string type, string manufacturer, string model, double consumption)
        {
            this.id = id;
            this.sumConsumption = sumConsumption;
            this.type = type;
            this.manufacturer = manufacturer;
            this.model = model;
            this.consumption = consumption;
        }
    }
}
