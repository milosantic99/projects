namespace Bertus_Igrannonica.Models
{
    public class PredictionModel
    {
        public List<string> array { get; set; }
        public List<string> inputs { get; set; }
        public string problem_type { get; set; }

        public string username { get; set; }
        public string problem_name { get; set; }
        public string model_name { get; set; }

        public List<List<string>> statistics { get; set; } = new List<List<string>>();

    }
}
