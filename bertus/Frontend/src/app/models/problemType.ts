import { OutlierType, ProblemType } from "../main-content/main-content.component";
import { Outlier } from "./outlier";

export class problemType
{
    public Id: number;
    public name: ProblemType;

    constructor(Id: number, name: ProblemType) {
        this.Id = Id;
        this.name = name;
    }
}