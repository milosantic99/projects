import { OutlierType } from "../main-content/main-content.component";

export class Outlier{
    public Id: number;
    public outlierName: OutlierType;

    constructor(Id:number, outlierName:OutlierType)
    {
        this.Id = Id;
        this.outlierName = outlierName;
    }
}