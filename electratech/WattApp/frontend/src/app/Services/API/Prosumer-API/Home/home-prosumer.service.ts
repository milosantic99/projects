import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/Enviroments/environment';
import { prosumerPageInformation } from 'src/app/Models/prosumerTableInfo';
import { OneData } from 'src/app/Pages/Prosumer/analysis-prosumer/analysis-prosumer.component';
import { MyDeviceInterface } from 'src/app/Pages/Prosumer/my-devices/my-devices.component';

@Injectable({
  providedIn: 'root'
})
export class HomeProsumerService {

  baseUrl = environment.backend+"/api/Prosumer";
  deviceUrl = environment.backend+"/api/Device";
  
  constructor(private http:HttpClient) { }

  getProsumer():Observable<prosumerPageInformation>{
    return this.http.get<prosumerPageInformation>(this.baseUrl+'/GetBasicProusumerInfoForProsumer');
  }

  getTopThree():Observable<MyDeviceInterface[]>{
    return this.http.get<MyDeviceInterface[]>(this.deviceUrl+'/TopThreeConsumers');
  }

  getConsumptionForThisWeekForProsumer(): Observable<OneData[]> {
    return this.http.get<OneData[]>(this.deviceUrl+'/GetConsumptionForThisWeekForProsumer');
  }

  getConsumptionForPastWeekForProsumer(): Observable<OneData[]> {
    return this.http.get<OneData[]>(this.deviceUrl+'/GetConsumptionForPastWeekForProsumer');
  }
}
