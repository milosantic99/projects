import { OptimizerType, RegularizationType } from "../main-content/main-content.component";

export class Regularization
{
    public Id: number;
    public name: RegularizationType;

    constructor(Id: number, name: RegularizationType) {
        this.Id = Id;
        this.name = name;
    }
}