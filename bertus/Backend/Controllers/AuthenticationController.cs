using Bertus_Igrannonica.Models;
using Bertus_Igrannonica.UserAPI;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;


namespace Bertus_Igrannonica.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase {

        public static User user = new User(); //TESTIRANJE//
        private readonly IConfiguration _configuration;
        private UserDb database;

        public AuthenticationController(IConfiguration configuration, UserDb database) {

            _configuration = configuration;
            this.database = database;
        }

        [HttpPost("register")]
        public async Task<ActionResult<User>> Regiser(UserDTO request) {

            if (request.Password.Equals(request.ConfirmPassword)) { //ako se poklapaju passwordi sa fronta poslati, ulazi se ovde

                await database.Connection.OpenAsync();
                var query = new UserQuery(database);

                if (query.CheckIfUserExists(request.Username) && query.CheckIfEmailExists(request.Email)) {

                    CreatePasswordHash(request.Password, out byte[] passwordHash, out byte[] passwordSalt);

                    user.Name = request.Name;
                    user.Surname = request.Surname;
                    user.Email = request.Email;
                    user.Username = request.Username;
                    user.PasswordHash = passwordHash;
                    user.PasswordSalt = passwordSalt;

                    query.insertUserIntoDatabase(user);

                    string wd = Directory.GetCurrentDirectory();
                    string path = System.IO.Path.Combine(wd, @"FileDatabase"); //+ @"\FileDatabase\";
                    if (!Directory.Exists(path))
                        Directory.CreateDirectory(path);

                    //kreacija foldera za novog korisnika
                    string currentPath = Directory.GetCurrentDirectory();
                    //string newPath = currentPath + @"\FileDatabase\" + user.Username;
                    string newPath = System.IO.Path.Combine(currentPath, @"FileDatabase", user.Username);
                    //Console.WriteLine(newPath);
                    if (Directory.Exists(newPath))
                        Console.WriteLine("Directory already exists on disk");
                    else {
                        System.IO.Directory.CreateDirectory(newPath);
                        Console.WriteLine("Directory for '{0}' created successfully", user.Username);
                    }

                    //pravljenje Data foldera za novog korisnika
                    string dataPath = System.IO.Path.Combine(newPath, @"Data");//newPath + @"\Data";
                    if (Directory.Exists(dataPath))
                        Console.WriteLine("Directory already exists on disk");
                    else {
                        System.IO.Directory.CreateDirectory(dataPath);
                        Console.WriteLine("Data folder for '{0}' created successfully", user.Username);
                    }

                    //pravljenje Models foldera za novog korisnika
                    string modelsPath = System.IO.Path.Combine(newPath, @"Models"); //newPath + @"\Models";
                    if (Directory.Exists(modelsPath))
                        Console.WriteLine("Directory already exists on disk");
                    else {
                        System.IO.Directory.CreateDirectory(modelsPath);
                        Console.WriteLine("Models folder for '{0}' created successfully", user.Username);
                    }

                    return Ok(user);
                }
                else if (!query.CheckIfUserExists(request.Username))
                    return BadRequest("That username is already taken.");
                else if (!query.CheckIfEmailExists(request.Email))
                    return BadRequest("That email is already taken.");
                else
                    return BadRequest("An error has occurred. Please try again");
            }
            else {
                return BadRequest("Password and password confirmation do not match.");
            }
        }


        //https://stackoverflow.com/questions/48749252/swagger-typeerror-failed-to-execute-fetch-on-window-request-with-get-head
        [HttpPost("login")]
        public async Task<ActionResult<string>> Login(UserDTO request) {

            await database.Connection.OpenAsync();
            var query = new UserQuery(database);

            /*if (!user.Username.Equals(request.Username)) {

                return BadRequest("User `" + request.Username + "` not found.");
            }*/
            //provera da li username postoji
            if (query.CheckIfUserExists(request.Username)) {

                return BadRequest("User `" + request.Username + "` not found.");
            }

            /*if (!VerifyPasswordHash(request.Password, user.PasswordHash, user.PasswordSalt)) {

                return BadRequest("Wrong password.");
            }*/
            //provera da li je dobro uneta sifra
            byte[]? passwordSalt = query.GetSalt(request.Username);

            byte[]? passwordHash = query.GetHash(request.Username);

            if (VerifyPasswordHash(request.Password, passwordHash, passwordSalt)) {

                string token = CreateToken(user);

                user.Username = request.Username;
                //FileUploadController.username = request.Username; //setovanje logovanog korisnika u FileUploadController-u

                /*foreach (string[] file in Directory.GetFiles(Directory.GetCurrentDirectory() + @"\FileDatabase\" + FileUploadController.username)) { // + @"\*.csv"
                    //string contents = System.IO.File.ReadAllText(file);
                    Console.WriteLine(contents);
                }*/
                /*IEnumerable<string> files = Directory.EnumerateFiles(Directory.GetCurrentDirectory() + @"\FileDatabase\" + FileUploadController.username);
                foreach (string file in files)
                    Console.WriteLine(file);*/

                query.GetUserInfo(request.Username);

                Console.WriteLine("Successful login: {0}; {1}; {2}; {3}", request.Username, user.Email, user.Name, user.Surname);

                //citanje imena fajlova
                string wd = Directory.GetCurrentDirectory();
                string path = System.IO.Path.Combine(wd, @"FileDatabase", request.Username, @"Data");
                DirectoryInfo di = new DirectoryInfo(path);        //(Directory.GetCurrentDirectory() + @"\FileDatabase\" + FileUploadController.username + @"\Data");
                FileInfo[] files = di.GetFiles("*.csv");
                List<string> fileNames = new List<string>();
                Console.WriteLine("Saved files: ");
                foreach (FileInfo file in files) {
                    Console.WriteLine(file.Name);
                    fileNames.Add(file.FullName);
                }
                Console.WriteLine("------------------");

                return Ok(new { token }); //vratiti i fajlove koje je korisnik vec ucitao
            }

            return BadRequest("Wrong password");
            //jwt.io testiranje tokena
        }

        [HttpPost("getAllUsers")]

        public async Task<ActionResult<List<User>>> GetAllUsers()
        {

            await database.Connection.OpenAsync();
            var query = new UserQuery(database);

            List<User> allUsers;

            allUsers = query.getAllUsers();
            //Console.WriteLine(allUsers.Count);

            List<string> allTokens = new List<string>();

            foreach (User user in allUsers)
                allTokens.Add(CreateToken(user));

            return Ok(allTokens);
        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt) {

            using (var hmac = new HMACSHA512()) { //kriptografski algoritam za hash-ovanje

                passwordSalt = hmac.Key; //svaki put ce biti drugaciji, jer ce se pri svakoj registraciji korisnika praviti novi HMACSHA512 koji ce imati novi kljuc
                //salt: byte 128
                /*Console.WriteLine("Salt: "+passwordSalt.Length);
                Console.WriteLine(passwordSalt.GetType());
                Console.WriteLine("-----------");*/
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                //hash: byte 64
                /*Console.WriteLine("Hash:"+passwordHash.Length);
                Console.WriteLine(passwordHash.GetType());
                Console.WriteLine("-----------");*/
            }
        }

        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt) {

            using (var hmac = new HMACSHA512(passwordSalt)) {

                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));

                return computedHash.SequenceEqual(passwordHash);
            }
        }

        private string CreateToken(User user) {

            List<Claim> claims = new List<Claim> {

                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Name, user.Name),
                new Claim(ClaimTypes.Name, user.Surname),
            };

            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(_configuration.GetSection("AppSettings:Token").Value));

            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: credentials
            );

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return jwt;
        }

        [HttpDelete("delete")]
        public async Task<ActionResult<string>> DeleteUser(UserDTO request) {

            await database.Connection.OpenAsync();
            var query = new UserQuery(database);

            if (query.deleteUserFromDatabase(request)) {

                Console.WriteLine("User `" + request.Username + "` deleted successfully");
                return Ok("User `" + request.Username + "` deleted successfully");
            }
            else {
                Console.WriteLine("User not deleted.");
                return BadRequest("User not deleted.");
            }
        }

        [HttpPut("update")]
        public async Task<ActionResult<string>> UpdateUser(UserDTO request) {

            await database.Connection.OpenAsync();
            var query = new UserQuery(database);

            if (query.updateUser(request)) {

                Console.WriteLine("User `" + request.Username + "` updated successfully");
                return Ok("User `" + request.Username + "` updated successfully");
            }
            else {
                Console.WriteLine("User not updated.");
                return BadRequest("User not updated.");
            }
        }
    }
}
