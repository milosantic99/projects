import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/Enviroments/environment';
import { listProducts } from 'src/app/Models/ProsumerDeviceElementInList';
import { prosumerPageInformation, prosumerTableInfo } from 'src/app/Models/prosumerTableInfo';
import { Prosumer } from 'src/app/Models/registerProsumer';

export interface NumberOfSearchProsumers{
  maxNumOfProsumer: number,
  max: number,
  min: number
}

@Injectable({
  providedIn: 'root'
})
export class DsoService {

  constructor(private http:HttpClient) { }

    baseUrl = environment.backend+"/api/Prosumer";
    baseUrlDevice = environment.backend+"/api/Device";
    baseUrlFilter = environment.backend+"/api/Filter";
      
    getProsumersForTable(paging:number, page:number,searchName:string,searchCity:string,consumerProducer:string):Observable<prosumerTableInfo[]>{
      var url = this.baseUrlFilter+`/SearchProsumers/${paging}/${page}/${consumerProducer}?`;
      if(searchName!='')
        url+=`search=${searchName}`;
      if(searchName==''&&searchCity!='')
        url+=`type=${searchCity}`;
      else if(searchName!=''&&searchCity!='')
        url+=`&type=${searchCity}`;
      // console.log(url);
      return this.http.get<prosumerTableInfo[]>(url);  
    }
    getNumOfProsumerIntable(paging:number, page:number,searchName:string,searchCity:string,consumerProducer:string):Observable<NumberOfSearchProsumers>{
      var url = this.baseUrlFilter+`/NumberOfSearchProsumers/${paging}/${page}/${consumerProducer}?`;
      if(searchName!='')
        url+=`search=${searchName}`;
      if(searchName==''&&searchCity!='')
        url+=`type=${searchCity}`;
      else if(searchName!=''&&searchCity!='')
        url+=`&type=${searchCity}`;
      // console.log(url);
      return this.http.get<NumberOfSearchProsumers>(url); 
    }

    //************************************************************ */
    
    getProsumerForDso(prosumerId:string):Observable<prosumerPageInformation>{
      return this.http.get<prosumerPageInformation>(this.baseUrl+'/GetBasicProusumerInfoForDso/'+prosumerId);
    }

    getProsumerDevice(prosumerId:string):Observable<listProducts[]>{
      return this.http.get<listProducts[]>(this.baseUrlDevice+'/GetAccessDevicesDso/'+prosumerId);
    }

    setStatusOfDevice(linkerId:number,prosumerId:string):Observable<string>{
      var obj = {
        linkerId:linkerId,
        prosumerId:prosumerId
      }
      return this.http.put<string>(this.baseUrlDevice+'/TurnOn(Off)DeviceForDso/',obj);
    }

    deleteProsumer(prosumerId: string):Observable<any> {
      return this.http.put<any>(this.baseUrl + '/DeleteProsumerDso/' + prosumerId, null);
    }

}
