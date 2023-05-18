using Bertus_Igrannonica.Controllers;
using Bertus_Igrannonica.Models;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using System.Data;

namespace Bertus_Igrannonica.UserAPI {
    public class UserQuery {

        public UserDb database { get; }

        public UserQuery(UserDb database) {
            this.database = database;
        }

        public bool CheckIfUserExists(string username) {

            try {
                string sql = "SELECT * from user_table where Username = @Username";
                MySqlCommand cmd = new MySqlCommand(sql, database.Connection);
                cmd.Parameters.AddWithValue("@Username", username);
                MySqlDataReader rdr = cmd.ExecuteReader();

                if (rdr.HasRows) {
                    rdr.Close();
                    return false; //nasao isti username
                }
                else {
                    rdr.Close();
                    return true; //nije nasao isti username
                }
            }
            catch (Exception ex) {
                Console.WriteLine(ex.ToString());
            }

            return false; //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~NACI BOLJI NACIN~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        }

        internal bool CheckIfEmailExists(string email) {

            try {
                string sql = "SELECT * from user_table where Email = @Email";
                MySqlCommand cmd = new MySqlCommand(sql, database.Connection);
                cmd.Parameters.AddWithValue("@Email", email);
                MySqlDataReader rdr = cmd.ExecuteReader();

                if (rdr.HasRows) {
                    rdr.Close();
                    return false; //nasao isti mail
                }
                else {
                    rdr.Close();
                    return true; //nije nasao isti username
                }
            }
            catch (Exception ex) {
                Console.WriteLine(ex.ToString());
            }

            return false;
        }

        /*public async Task<User> GetUserByUsername(string username) {

            try {
                string sql = "SELECT * from user_table where Username = @Username";
                MySqlCommand cmd = new MySqlCommand(sql, database.Connection);
                cmd.Parameters.AddWithValue("@Username", username);
                MySqlDataReader rdr = cmd.ExecuteReader();

                while (rdr.Read()) {
                    //Console.WriteLine(rdr[0] + " -- " + rdr[1]);
                    int id = int.Parse(rdr["Id"].ToString());
                    string name = rdr["Name"].ToString();
                    string surname = rdr["Surname"].ToString();
                    string email = rdr["Email"].ToString();

                    string passwordHash = rdr["PasswordHash"].ToString();
                    string passwordSalt = rdr["PasswordSalt"].ToString();
                    
                    User user = new User(id, name, surname, email, passwordHash, passwordSalt);

                    rdr.Close();
                    return user;
                }
                
            }
            catch (Exception ex) {
                Console.WriteLine(ex.ToString());
            }

            return null;
        }*/

        internal void GetUserInfo(string username) {

            try {
                string sql = "SELECT `Name`, `Surname`, `Email` FROM `user_table` where Username = @Username";
                MySqlCommand cmd = new MySqlCommand(sql, database.Connection);
                cmd.Parameters.AddWithValue("@Username", username);
                MySqlDataReader rdr = cmd.ExecuteReader();

                if (rdr.Read()) {
                    // = (byte[])rdr[0];
                    AuthenticationController.user.Name = rdr[0].ToString();
                    AuthenticationController.user.Surname = rdr[1].ToString();
                    AuthenticationController.user.Email = rdr[2].ToString();

                    rdr.Close();
                }
            }
            catch (Exception ex) {
                Console.WriteLine(ex.ToString());
            }
        }

        internal async void insertUserIntoDatabase(User user) {

            try {
                string sql = "INSERT INTO `user_table` (`Id`, `Name`, `Surname`, `Username`, `Email`, `PasswordSalt`, `PasswordHash`)" +
                    " VALUES (NULL, @Name, @Surname, @Username, @Email, @PasswordSalt, @PasswordHash)";
                MySqlCommand cmd = new MySqlCommand(sql, database.Connection);

                cmd.Parameters.AddWithValue("@Name", user.Name);
                cmd.Parameters.AddWithValue("@Surname", user.Surname);
                cmd.Parameters.AddWithValue("@Username", user.Username);
                cmd.Parameters.AddWithValue("@Email", user.Email);
                cmd.Parameters.AddWithValue("@PasswordHash", user.PasswordHash);
                cmd.Parameters.AddWithValue("@PasswordSalt", user.PasswordSalt);

                await cmd.ExecuteNonQueryAsync();

            }
            catch (Exception ex) {
                Console.WriteLine(ex.ToString());
            }
        }

        //dodati await na cmd.execute i staviti povratni tip Task<bool>
        internal bool deleteUserFromDatabase(UserDTO user) {

            try {
                string sql = "DELETE FROM `user_table` WHERE `Username` = @Username AND `Email` = @Email";
                MySqlCommand cmd = new MySqlCommand(sql, database.Connection);

                cmd.Parameters.AddWithValue("@Username", user.Username);
                cmd.Parameters.AddWithValue("@Email", user.Email);

                cmd.ExecuteNonQueryAsync();

                return true;
            }
            catch (Exception ex) {
                Console.WriteLine(ex.ToString());
                return false;
            }
        }

        internal byte[]? GetSalt(string username) {

            try {
                string sql = "SELECT `PasswordSalt` FROM `user_table` where Username = @Username";
                MySqlCommand cmd = new MySqlCommand(sql, database.Connection);
                cmd.Parameters.AddWithValue("@Username", username);
                MySqlDataReader rdr = cmd.ExecuteReader();

                if (rdr.Read()) {
                    byte[] passworSalt = (byte[])rdr[0];
                    
                    rdr.Close();
                    return passworSalt;
                }
            }
            catch (Exception ex) {
                Console.WriteLine(ex.ToString());
            }

            return null;
        }

        internal byte[]? GetHash(string username) {

            try {
                string sql = "SELECT `PasswordHash` FROM `user_table` where Username = @Username";
                MySqlCommand cmd = new MySqlCommand(sql, database.Connection);
                cmd.Parameters.AddWithValue("@Username", username);
                MySqlDataReader rdr = cmd.ExecuteReader();

                if (rdr.Read()) {
                    byte[] passworHash = (byte[])rdr[0];

                    rdr.Close();
                    return passworHash;
                }
            }
            catch (Exception ex) {
                Console.WriteLine(ex.ToString());
            }

            return null;
        }

        internal bool updateUser(UserDTO request) {

            try {
                string sql = "UPDATE `user_table` SET `Name` = @Name, `Surname` = @Surname, `Email` = @Email WHERE `user_table`.`Username` = @Username";
                MySqlCommand cmd = new MySqlCommand(sql, database.Connection);
                cmd.Parameters.AddWithValue("@Username", request.Username);
                cmd.Parameters.AddWithValue("@Name", request.Name);
                cmd.Parameters.AddWithValue("@Surname", request.Surname);
                cmd.Parameters.AddWithValue("@Email", request.Email);

                cmd.ExecuteNonQueryAsync();

                return true;
            }
            catch (Exception ex) {
                Console.WriteLine(ex.ToString());
                return false;
            }
        }

        internal List<User> getAllUsers() {

            try {
                string sql = "SELECT `Name`, `Surname`, `Username`, `Email` FROM `user_table`";
                MySqlCommand cmd = new MySqlCommand(sql, database.Connection);
                MySqlDataReader rdr = cmd.ExecuteReader();
                List<User> allUsers = new List<User>();

                while (rdr.Read()) {

                    User newUser = new User();

                    newUser.Name = rdr[0].ToString();
                    newUser.Surname = rdr[1].ToString();
                    newUser.Username = rdr[2].ToString();
                    newUser.Email = rdr[3].ToString();

                    allUsers.Add(newUser);
                }

                rdr.Close();

                return allUsers;
            }
            catch (Exception ex) {
                Console.WriteLine(ex.ToString());
                return null;
            }
        }
    }
}
