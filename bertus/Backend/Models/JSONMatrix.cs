namespace Bertus_Igrannonica.Models
{
    public class JSONMatrix
    {
        public string filename { get; set; } = string.Empty;
        public List<string> headers { get; set; } = new List<string>();
        public List<List<string>> data { get; set; } = new List<List<string>>();
    }
}
