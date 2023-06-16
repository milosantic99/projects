using System.Diagnostics.CodeAnalysis;

namespace backend.Dtos
{
    public class DsoDtoOtherEdit
    {
        [MaybeNull]
        public string companyName { get; set; }
        [MaybeNull]
        public string email { get; set; }
        [MaybeNull]
        public string firstName { get; set; }
        [MaybeNull]
        public string lastName { get; set; }
        [MaybeNull]
        public string adress { get; set; }
    }
}
