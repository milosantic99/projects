using Bertus_Igrannonica.Enums;

namespace Bertus_Igrannonica.Models {
    public class JSONReceive {
        public string filename { get; set; } = string.Empty;
        public List<string> headers { get; set; } = new List<string>();
        public List<string[]> data { get; set; } = new List<string[]>(); //List<string[]> (test)     ili    List<List<string>> (radi dobro)
        public ActivationType activation_type { get; set; }
        public RegularizationType regularization_type { get; set; }
        public ProblemType problem_type { get; set; }
        public OptimizerType optimizer_type { get; set; }
        public LossType loss_type { get; set; }
        public OutlierType outlier_type { get; set; }
        public ReplaceNumber replace_number_type { get; set; }
        public ReplaceCat replace_cat_type { get; set; }
        public List<int> inputs { get; set; } = new List<int>();
        public int output { get; set; } = 0;
        public int hiddenLayerCounter { get; set; }
        public List<int> neuronArray { get; set; } = new List<int>();
        public int epoch { get; set; }
        public float learning_rate { get; set; } = 0;
        public float regularization_rate { get; set; } = 0;
        public string connectionId { get; set; } = string.Empty;
        public string username { get; set; } = string.Empty;
        public string model_name { get; set; } = string.Empty;
        public string problem_name { get; set; } = string.Empty;
        public int train_validation_ratio { get; set; } = 0;
        public int train_test_ratio { get; set; } = 0;
        public List<List<float>>? matrix { get; set; }
        public List<EncodeType> encode_type { get; set; } = new List<EncodeType>();
        public List<DataType> data_type { get; set; } = new List<DataType>();
    }
}