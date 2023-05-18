import { ActivationType } from "../main-content/main-content.component";

export class Activation
{
    public Id: number;
    public name: ActivationType;

    constructor(Id:number, name:ActivationType) {
        this.Id = Id;
        this.name = name;
    }
}