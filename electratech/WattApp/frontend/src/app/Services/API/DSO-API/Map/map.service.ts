import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,of } from 'rxjs';
import { environment } from 'src/app/Enviroments/environment';
import { GetProsumerInfoDso,GetProsumerOnMap,getConsumption } from 'src/app/Models/getProsumerInfoDSO';

export interface locationInt
{
      lat: number,
      lon: number,
      display_name: string
}

@Injectable({
  providedIn: 'root'
})
export class MapService {

    baseUrl = environment.backend+"/api/"


  
  constructor(private http:HttpClient){}

  // getUsers():Observable<GetProsumerInfoDso[]>
  // {
  //   return this.http.get<GetProsumerInfoDso[]>(this.baseUrl+"Prosumer/GetAllDsoProsumers");
  // }

  // getConsumption(id:string):Observable<getConsumption>
  // {
  //   return this.http.get<getConsumption>(this.baseUrl+"Device/ProsumerDevicesConsumptionNow/"+id);
    
  // }

  getUsers():Observable<GetProsumerOnMap[]>{
    return this.http.get<GetProsumerOnMap[]>(this.baseUrl+"Device/ProsumerDevicesConsumptionNow");
  }

  getLocation(query:string):Observable<locationInt[]>{
    return this.http.get<locationInt[]>(`https://nominatim.openstreetmap.org/search.php?q=${query}&format=jsonv2`)
  }

}
