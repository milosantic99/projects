namespace Bertus_Igrannonica.Models {
    public class JSONSend {

        public string filename { get; set; } = string.Empty;
        public int length { get; set; } = 0;
        public List<string> headers { get; set; } = new List<string>();
        public List<string[]> data { get; set; } = new List<string[]>();
    }
}
