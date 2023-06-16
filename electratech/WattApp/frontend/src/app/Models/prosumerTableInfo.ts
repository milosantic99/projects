
export interface prosumerTableInfo{
    prosumerId: string,
    prosumerName: string,
    city: string,
    consumption: string,
    product: string,
    debit: string,
    x:number,
    y:number,
    adress:string
}

export interface prosumerPageInformation{
    firstName: string;
    lastName: string;
    email: string;
    image: string;
    city: string;
    adress: string;
    debit:number;
    dsoId:string;
}

export class prosumerTableInfoForCsv{
    prosumerName: string;
    city: string;
    consumption: string;
    product: string;
    debit: string;
    address:string;
    x:number;
    y:number;
    constructor(prosumerName:string, city:string,adress:string,consumption:string,product: string,debit: string,x:number,y:number){
        this.prosumerName = prosumerName;
        this.city=city;
        this.address=adress;
        this.consumption = consumption;
        this.product=product;
        this.debit=debit;
        this.x = x;
        this.y = y;
    }
}