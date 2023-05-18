namespace Bertus_Igrannonica.Models {
    public class PredictionDTO {
        public List<string> array { get; set; } = new List<string>();
        public List<string> inputs { get; set; } = new List<string>();
        public string problem_type { get; set; } = String.Empty;

        public List<NumericMatrixValue>? numericalMatrixValueList { get; set; } = new List<NumericMatrixValue>();
        public List<CategoricalMatrixValue>? categoricalMatrixValueList { get; set; } = new List<CategoricalMatrixValue>();
        public NumericMatrixValue numericalMatrixOutput { get; set; } = new NumericMatrixValue();
        public CategoricalMatrixValue categoricalMatrixOutput { get; set; } = new CategoricalMatrixValue();

        public string modelPath { get; set; } = String.Empty;
        public List<List<string>> statistics { get; set; } = new List<List<string>>();
    }
}
