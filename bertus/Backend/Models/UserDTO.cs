namespace Bertus_Igrannonica.Models {
    public class UserDTO {

        public string Name { get; set; } = string.Empty;
        public string Surname { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Username { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string ConfirmPassword { get; set; } = string.Empty; //ako nije isti kao password, mora se opet unositi. Uporediti i na frontu i na beku
    }
}
