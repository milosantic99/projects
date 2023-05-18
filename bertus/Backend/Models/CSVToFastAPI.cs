namespace Bertus_Igrannonica.Models {
    public class CSVToFastAPI {

        public IFormFile? CSVFile { get; set; }
        public string? FileName { get; set; }
        public string? ContentType { get; set; }
        public CSVToFastAPI() { }

        /*public CSVToFastAPI(byte[] file, string filename, string contenttype) {
            CSVFile = file;
            FileName = filename;
            ContentType = contenttype;
        }*/
    }
}
