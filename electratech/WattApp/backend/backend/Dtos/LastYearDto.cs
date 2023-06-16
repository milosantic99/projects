namespace backend.Dtos
{
    public class LastYearDto
    {
        public string name {  get; set; }
        public double prosumption { get; set; }

        public LastYearDto(string name, double prosumption)
        {
            this.name = name;
            this.prosumption = prosumption;
        }
    }
}
