namespace backend.Dtos
{
    public class OverviewAnalysisDto
    {
        public string name { get; set; }
        public double value { get; set; }
        public double prediction { get; set; }

        public OverviewAnalysisDto(string name, double value, double prediction)
        {
            this.name = name;
            this.value = value;
            this.prediction = prediction;
        }
    }
}
