namespace Bertus_Igrannonica.Models {
    public class NumericMatrixValue {
        public NumericMatrixValue(int label, string headerName) {
            this.label = label;
            this.headerName = headerName;
        }
        public NumericMatrixValue() { }
        public int label { get; set; }
        public string headerName { get; set; }
    }
}
