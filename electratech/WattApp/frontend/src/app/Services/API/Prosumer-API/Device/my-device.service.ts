import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/Enviroments/environment';
import { SetDeviceName } from 'src/app/Pages/Prosumer/my-device/my-device.component';

export interface WorkRules{
  linkerId: number,
  dateOn: string|null,
  dateOff: string|null,
  timeOn: number|null,
  timeOff: number|null
}

@Injectable({
  providedIn: 'root'
})
export class MyDeviceService {

  constructor(private http:HttpClient) { }

  baseUrl = environment.backend+"/api/Device";

  // pregled dnevni
  getOverviewOfDailyConsumptionForDevice(linkerId:number){
    return this.http.get(this.baseUrl + `/OverviewOfDailyConsumptionForDevice/${linkerId}`);
  }

  getOverviewOfDailyProductionForDevice(linkerId:number){
    return this.http.get(this.baseUrl + `/OverviewOfDailyProductionForDevice/${linkerId}`);
  }

  // pregled nedeljni
  getOverviewOfWeeklyConsumptionForDevice(linkerId:number){
    return this.http.get(this.baseUrl + `/OverviewOfWeeklyConsumptionForDevice/${linkerId}`);
  }

  getOverviewOfWeeklyProductionForDevice(linkerId:number){
    return this.http.get(this.baseUrl + `/OverviewOfWeeklyProductionForDevice/${linkerId}`);
  }

  // pregled mesecni
  getOverviewOfMonthlyConsumptionForDevice(linkerId:number){
    return this.http.get(this.baseUrl + `/OverviewOfMonthlyConsumptionForDevice/${linkerId}`);
  }

  getOverviewOfMonthlyProductionForDevice(linkerId:number){
    return this.http.get(this.baseUrl + `/OverviewOfMonthlyProductionForDevice/${linkerId}`);
  }

  getDeviceForDevicePage(deviceId:string){
    return this.http.get(this.baseUrl + `/GetDeviceForDevicePage/${deviceId}`);
  }

  // suma dnevna
  getSumOfDailyConsumptionForDevice(linkerId:number){
    return this.http.get(this.baseUrl + `/SumOfDailyConsumptionForDevice/${linkerId}`);
  }

  getSumOfDailyProudctionForDevice(linkerId:number){
    return this.http.get(this.baseUrl + `/SumOfDailyProductionForDevice/${linkerId}`);
  }

  // suma nedeljna
  getSumOfWeeklyConsumptionForDevice(linkerId:number){
    return this.http.get(this.baseUrl + `/SumOfWeeklyConsumptionForDevice/${linkerId}`);
  }

  getSumOfWeeklyProductionForDevice(linkerId:number){
    return this.http.get(this.baseUrl + `/SumOfWeeklyProductionForDevice/${linkerId}`);
  }

  // suma mesecna
  getSumOfMonthlyConsumptionForDevice(linkerId:number){
    return this.http.get(this.baseUrl + `/SumOfMonthlyConsumptionForDevice/${linkerId}`);
  }

  getSumOfMonthlyProductionForDevice(linkerId:number){
    return this.http.get(this.baseUrl + `/SumOfMonthlyProductionForDevice/${linkerId}`);
  }

  // baratanje sa stanjima uredjaja i ostalo
  turnOnOff(linkerId:number){
    var obj = {linkerId: linkerId}
    return this.http.put<string>(this.baseUrl + `/TurnOn(Off)Device`, obj);
  }

  giveTakeControl(linkerId:number){
    var obj = {linkerId: linkerId}
    return this.http.put<string>(this.baseUrl + `/Give(Take)Control`, obj);
  }

  allowDisallowAccess(linkerId:number){
    var obj = {linkerId: linkerId}
    return this.http.put<string>(this.baseUrl + `/Allow(Disallow)Access`, obj);
  }

  // promena naziva uredjaja
  setDeviceName(deviceSetName: SetDeviceName){
    return this.http.put<string>(this.baseUrl + `/SetDeviceName`, deviceSetName);
  }

  // dodavanje uredjaja
  addDevices(listId: string[]){
    return this.http.post(this.baseUrl + `/AddDevices`, listId);
  }

  deleteDevice(linkerId: number) {
    return this.http.delete(this.baseUrl + `/RemoveDevice/${linkerId}`);
  }

  // definisanje pravila rada
  setWorkRules(info:WorkRules){
    if(info.dateOff=="")
    {
      info.dateOff = null;
      info.timeOff = null;
    }
    if(info.dateOn=="")
    {
      info.dateOn = null;
      info.timeOn = null;
    }
    console.log(info);
    return this.http.put(this.baseUrl+`/SetWorkRules`,info);
  }

  // zahtev za pravila rada
  getWorkRules(linkerId:number):Observable<WorkRules>{
    return this.http.get<WorkRules>(this.baseUrl+"/GetWorkRules/"+linkerId);
  }
  deletWorkRule(linkerId:number){
    return this.http.delete(this.baseUrl+`/DeleteWorkRules/${linkerId}`);
  }
}
