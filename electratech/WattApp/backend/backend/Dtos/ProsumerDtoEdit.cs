using System.Diagnostics.CodeAnalysis;

namespace backend.Dtos
{
    public class ProsumerDtoEdit
    {
        public string firstName { get; set; }
        public string lastName { get; set; }
        public string email { get; set; }
        [MaybeNull]
        public string password { get; set; }
        public string phoneNumber { get; set; }
    }
}
