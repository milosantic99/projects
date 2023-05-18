export class Metrics
{
    public Id: number;
    public metricName: string;

    constructor(Id:number,metricName:string)
    {
        this.Id = Id;
        this.metricName = metricName;
    }
}