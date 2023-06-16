namespace backend.Dtos
{
    public class NewRecordDto
    {
        public int timeStamp { get; set; }
        public DateTime date { get; set; }
        public int linkerId { get; set; }
        public double currentConsumption { get; set; }
        public double prediction { get; set; }
        public bool simulaiton { get; set; }
    }
}
