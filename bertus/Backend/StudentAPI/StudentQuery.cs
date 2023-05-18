using Bertus_Igrannonica.Models;
using StudentAPI;
using System.Data.Common;

namespace Bertus_Igrannonica.StudentAPI {
    public class StudentQuery {

        public AppDb database { get; }

        public StudentQuery(AppDb database) {
            this.database = database;
        }

        private async Task<List<Student>> ReadAllAsync(DbDataReader reader) {

            var students = new List<Student>();
            using (reader) {
                while (await reader.ReadAsync()) {

                    var student = new Student() {

                        id = reader.GetInt32(0),
                        Name = reader.GetString(1),
                        Index = reader.GetInt32(2),
                    };

                    students.Add(student);
                }
            }
            return students;
        }

        public async Task<List<Student>> GetAll() {

            using var cmd = database.Connection.CreateCommand();
            cmd.CommandText = "SELECT * FROM team_members";
            var result = await ReadAllAsync(await cmd.ExecuteReaderAsync());
            return result;
        }
    }
}
