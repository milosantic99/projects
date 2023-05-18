using Bertus_Igrannonica.Enums;

namespace Bertus_Igrannonica.Models
{
    public class ProblemModel
    {

        public string filename { get; set; } = string.Empty;
        public List<string> headers { get; set; } = new List<string>();
        public List<string[]> data { get; set; } = new List<string[]>();
        public OutlierType outlier_type { get; set; }
        public string username { get; set; } = string.Empty;
        public List<ReplaceMissing> replace_missing { get; set; } = new List<ReplaceMissing>();
        public string problem_name { get; set; } = string.Empty;
        public DataCleaning data_cleaning { get; set; }
        public List<int> data_types { get; set; }
        public List<List<string>> statistics { get; set; } = new List<List<string>>();
    }
}
