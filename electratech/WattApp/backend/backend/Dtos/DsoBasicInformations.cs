namespace backend.Dtos
{
    public class DsoBasicInformations
    {
        public string firstName { get; set; }
        public string lastName { get; set; }
        public string email { get; set; }

        public string image { get; set; }

        public DsoBasicInformations(string firstName, string lastName, string email, string image)
        {
            this.firstName = firstName;
            this.lastName = lastName;
            this.email = email;
            this.image = image;
        }
    }
}
