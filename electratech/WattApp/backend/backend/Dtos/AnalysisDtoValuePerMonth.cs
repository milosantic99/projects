namespace backend.Dtos
{
    public class AnalysisDtoValuePerMonth
    {
        public string date { get; set; }
        public double value { get; set; }

        public AnalysisDtoValuePerMonth(string date, double value)
        {
            this.date = date;
            this.value = value;
        }
    }
}
