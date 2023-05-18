namespace Bertus_Igrannonica.Models {
    public class HypToSend {

        public string activation_type { get; set; } = string.Empty;
        public string regularization_type { get; set; } = string.Empty;
        public string problem_type { get; set; } = string.Empty;
        public string optimizer_type { get; set; } = string.Empty;
        public string loss_type { get; set; } = string.Empty;
        public string encode_type { get; set; } = string.Empty;
        public string outlier_type { get; set; } = string.Empty;
        public string replace_number_type { get; set; } = string.Empty;
        public string replace_cat_type { get; set; } = string.Empty;
        public int hiddenLayerCounter { get; set; } = 0;
        public List<int> neuronArray { get; set; } = new List<int>();
        public int epoch { get; set; } = 0;
        public float learning_rate { get; set; } = 0;
        public float regularization_rate { get; set; } = 0;
        public string username { get; set; } = string.Empty;
        public string model_name { get; set; } = string.Empty;
        public string problem_name { get; set; } = string.Empty;
        public int train_validation_ratio { get; set; } = 0;
        public List<List<float>>? matrix { get; set; }
        public string output { get; set; } = string.Empty;
        public List<string> inputs { get; set; } = new List<string>();
        public string filename { get; set; } = string.Empty;
        public string connectionId { get; set; } = string.Empty;
        public List<NumericMatrixValue>? numericalMatrixValueList { get; set; } = new List<NumericMatrixValue>();
        public List<CategoricalMatrixValue>? categoricalMatrixValueList { get; set; } = new List<CategoricalMatrixValue>();
        public NumericMatrixValue numericalMatrixOutput { get; set; } = new NumericMatrixValue();
        public CategoricalMatrixValue categoricalMatrixOutput { get; set; } = new CategoricalMatrixValue();

        public List<List<string>> statistics { get; set; } = new List<List<string>>();
    }
}
