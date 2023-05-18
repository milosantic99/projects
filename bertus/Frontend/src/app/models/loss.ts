import { LossType } from "../main-content/main-content.component";

export class Loss{
    public Id: number;
    public lossName: LossType;

    constructor(Id:number,lossName:LossType)
    {
        this.Id = Id;
        this.lossName = lossName;
    }
}