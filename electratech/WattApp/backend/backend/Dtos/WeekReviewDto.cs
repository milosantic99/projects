namespace backend.Dtos
{
    public class WeekReviewDto
    {
        public string time { get; set; }
        public double consumption { get; set; }

        public WeekReviewDto(string time, double consumption)
        {
            this.time = time;
            this.consumption = consumption;
        }
    }
}
