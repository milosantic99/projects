using System.Net;

namespace backend.Models
{
    public class OpenStreetMapSearchResult
    {
        public string x { get; set; }
        public string y { get; set; }
        public Address address { get; set; }
    }
}
