namespace Bertus_Igrannonica.Models {
    public class ProblemsTableRow {
        public ProblemsTableRow(string problemName, string csvName, DateTime datumVreme) {
            this.problemName = problemName;
            this.csvName = csvName;
            this.datumVreme = datumVreme;
        }

        public string problemName { get; set; } = string.Empty;
        public string csvName { get; set; } = string.Empty;
        public DateTime datumVreme { get; set; }
    }
}
