namespace backend.Dtos
{
    public class DtoProsumerSort
    {
        public Guid id { get; set; }
        public double sumConsumption { get; set; }
        public string firstName { get; set; }
        public string lastName { get; set; }
        public string city { get; set; }
        public string address { get; set; }

        public DtoProsumerSort(Guid id, double sumConsumption, string firstName, string lastName, string city, string address)
        {
            this.id = id;
            this.sumConsumption = sumConsumption;
            this.firstName = firstName;
            this.lastName = lastName;
            this.city = city;
            this.address = address;
        }
    }
}
