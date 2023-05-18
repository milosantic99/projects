namespace Bertus_Igrannonica.Models {
    public class PageToShow {

        public int PageIndex { get; set; }
        public int LinesPerPage { get; set; }

        public PageToShow(int pageIndex, int linesPerPage) {
            PageIndex = pageIndex;
            LinesPerPage = linesPerPage;
        }
    }
}
