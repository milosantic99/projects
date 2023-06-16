namespace backend.Dtos
{
    public class AnalysisDtoValuePerDate
    {
        public DateTime date { get; set; }
        public double value { get; set; }

        public AnalysisDtoValuePerDate(DateTime date, double value)
        {
            this.date = date;
            this.value = value;
        }
    }
}
