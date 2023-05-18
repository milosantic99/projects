using MySql.Data.MySqlClient;

namespace Bertus_Igrannonica.UserAPI {
    public class UserDb : IDisposable {

        public MySqlConnection Connection { get; }

        public UserDb(string connectionString) {
            Connection = new MySqlConnection(connectionString);
            Console.WriteLine("Connected to MySql;user_table");
        }

        public void Dispose() => Connection.Dispose();
    }
}
