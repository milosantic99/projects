namespace Bertus_Igrannonica.Models {
    public class User {

        public int Id { get; }
        public string Name { get; set; } = string.Empty;
        public string Surname { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Username { get; set; } = string.Empty;
        public byte[]? PasswordHash { get; set; }
        public byte[]? PasswordSalt { get; set; }

        public User() {
        
        }
        public User(int id, string name, string surname, string email, byte[] passwordHash, byte[] passwordSalt) {
            Id = id;
            Name = name;
            Surname = surname;
            Email = email;
            PasswordHash = passwordHash;
            PasswordSalt = passwordSalt;
        }

        

        //u bazi se ne cuva sam password, vec se cuva so (salt) i password hash. Kada se korisnik loguje, trazi se isti username, kada se on pronadje
        //uzima se sifra koju je korisnik uneo, na nju se dodaje salt i tako spojeni se hash-uju, nakon cega se dobijeni hash uporedjuje sa sacuvanim hash-om, i ako su isti
        //korisnik se uspesno loguje.
    }
}
