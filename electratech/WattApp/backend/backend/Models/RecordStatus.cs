using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class RecordStatus
    {
		[Key]
		public Guid id { get; set; }
		public int linkerId { get; set; }
		public double currentConsumption { get; set; }
		public DateTime? startDate { get; set; }
		public DateTime? endDate { get; set; }

    }
}
