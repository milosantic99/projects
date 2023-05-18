export class Phase
{
    public Id: number;
    public phase: string;
    public is_completed: boolean;

    constructor(Id:number,metricName:string, is_completed:boolean)
    {
        this.Id = Id;
        this.phase = metricName;
        this.is_completed = is_completed;
    }
}