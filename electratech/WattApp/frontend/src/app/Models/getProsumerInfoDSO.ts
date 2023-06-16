export interface GetProsumerInfoDso{
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    token: string,
    role: number,
    idDso: string,
    image: string,
    city: string,
    address: string,
    phoneNumber: string,
    simulation: boolean,
    x: number,
    y: number,
    debt: number
}

export interface getConsumption{
    currentConsumption: number
}

export interface GetProsumerOnMap{
    prosumerId:string,
    prosumerName: string,
    prosumerLastName: string
    consumption: number,
    productioin: number,
    x: number,
    y: number
}