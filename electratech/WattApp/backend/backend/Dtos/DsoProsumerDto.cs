namespace backend.Dtos
{
    public class DsoProsumerDto
    {
        public Guid prosumerId { get; set; }
        public string prosumerName { get; set; }
        public string city { get; set; }
        public string adress { get; set; }
        public double consumption { get; set; }
        public double product { get; set; }
        public double debit { get; set; }
        public double x { get; set; }
        public double y { get; set; }
    }
}
