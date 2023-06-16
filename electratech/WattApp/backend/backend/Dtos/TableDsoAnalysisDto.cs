namespace backend.Dtos
{
    public class TableDsoAnalysisDto
    {
        public string month { get; set; }
        public double consumption { get; set; }
        public double predictedConsumption { get; set; }
        public double production { get; set; }
        public double productionPredicted { get; set; }

        public TableDsoAnalysisDto(string month, double consumption, double predictedConsumption, double production, double productionPredicted)
        {
            this.month = month;
            this.consumption = consumption;
            this.predictedConsumption = predictedConsumption;
            this.production = production;
            this.productionPredicted = productionPredicted;
        }
    }
}
