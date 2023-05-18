namespace Bertus_Igrannonica.Models {
    public class CsvFromFileSystem {
        public string filename { get; set; } = string.Empty;
        public string[]? headers { get; set; }
        public List<string[]> data { get; set; } = new List<string[]>();
        public List<string> data_types { get; set; } = new List<string>();
    }
}
