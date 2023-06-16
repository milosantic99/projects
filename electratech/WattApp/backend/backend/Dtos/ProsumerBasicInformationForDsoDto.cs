namespace backend.Dtos
{
    public class ProsumerBasicInformationForDsoDto
    {
        public string firstName { get; set; }
        public string lastName { get; set; }
        public string email { get; set; }
        public string adress { get; set; }
        public string city { get; set; }
        public double debit { get; set; }
        public string image { get; set; }
        public Guid dsoId { get; set; }

        public ProsumerBasicInformationForDsoDto(string firstName, string lastName, string email, string adress, string city, double debit, string image, Guid dsoId)
        {
            this.firstName = firstName;
            this.lastName = lastName;
            this.email = email;
            this.adress = adress;
            this.city = city;
            this.debit = debit;
            this.image = image;
            this.dsoId = dsoId;
        }
    }
}
