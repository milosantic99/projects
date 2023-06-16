namespace backend.Dtos
{
    public class MonthReviewDto
    {
        public string time { get; set; }
        public double consumption { get; set; }

        public MonthReviewDto(string time, double consumption)
        {
            this.time = time;
            this.consumption = consumption;
        }
    }
}
