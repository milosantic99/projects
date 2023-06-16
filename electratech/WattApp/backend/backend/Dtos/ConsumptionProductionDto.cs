namespace backend.Dtos
{
    public class ConsumptionProductionDto
    {
        public string name { get; set; }
        public double sum { get; set; }

        public ConsumptionProductionDto(string name, double sum)
        {
            this.name = name;
            this.sum = sum;
        }
    }
}
