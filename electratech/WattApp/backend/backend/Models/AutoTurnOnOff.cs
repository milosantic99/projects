using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace backend.Models
{
    public class AutoTurnOnOff
    {
        [Key]
        public Guid id {get; set; }
        public int linkerId { get; set; }
        [MaybeNull]
        public DateTime? dateOn { get; set; }
        [MaybeNull]
        public DateTime? dateOff { get; set; }
        [MaybeNull]
        public int? timeOn { get; set; }
        [MaybeNull]
        public int? timeOff { get; set; }
    }
}
