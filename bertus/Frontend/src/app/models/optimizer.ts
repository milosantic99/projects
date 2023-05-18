import { OptimizerType } from "../main-content/main-content.component";

export class Optimizer{
    public Id: number;
    public optimizerName: OptimizerType;

    constructor(Id:number,optimizerName:OptimizerType)
    {
        this.Id = Id;
        this.optimizerName = optimizerName;
    }
}