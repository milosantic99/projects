import { EncodeType } from "../main-content/main-content.component";

export class Encode
{
    public Id: number;
    public encodeName: EncodeType;

    constructor(Id: number, encodeName: EncodeType) {
        this.Id = Id;
        this.encodeName = encodeName;
    }
}