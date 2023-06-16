namespace backend.Dtos
{
    public class TodayReviewDto
    {
        public string time { get; set; }
        public double consumption { get; set; }

        public TodayReviewDto(string time, double consumption)
        {
            this.time = time;
            this.consumption = consumption;
        }
    }
}
