namespace backend.Dtos
{
    public class CardComponentAnalysisDsoDto
    {
        public string name { get; set; }
        public double predicted { get; set; }

        public CardComponentAnalysisDsoDto(string name, double predicted)
        {
            this.name = name;
            this.predicted = predicted;
        }
    }
}
