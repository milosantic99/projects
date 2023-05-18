using MySqlConnector;

namespace StudentAPI {
    public class AppDb : IDisposable {
        public MySqlConnection Connection { get; }

        public AppDb(string connectionString) {
            Connection = new MySqlConnection(connectionString);
            Console.WriteLine("Connected to mysql studenttable");
        }

        public void Dispose() => Connection.Dispose();
    }
}