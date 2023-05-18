namespace Bertus_Igrannonica.Models {
    public class CategoricalMatrixValue {
        public int label { get; set; } = 0;
        public string? headerName { get; set; } = string.Empty;
        public int randomNumber { get; set; } = 0;
        public int numberOfValues { get; set; } = 0;
        public List<string>? values { get; set; } = new List<string>();
    }
}
