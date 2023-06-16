export interface registerDSO{
    id:string,
    companyName:string,
    ownerFirstName:string,
    ownerLastName:string,
    address:string,
    email:string,
    password:string,
    token:string,
    role:number,
    slika:string
  }
  export interface DSOInformation{
    id: string,
    companyName: string,
    ownerFirstName: string,
    ownerLastName: string,
    address: string,
    email: string,
    password: string,
    token: string,
    role: number,
    image: string
  }

  export interface DsoBasicInformation{
    email: string,
    firstName: string,
    lastName: string,
    image: string
  }