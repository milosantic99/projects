import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/Enviroments/environment';
import { SetDeviceName } from 'src/app/Pages/Prosumer/my-device/my-device.component';

@Injectable({
  providedIn: 'root'
})
export class MyDevicesService {

  constructor(private http:HttpClient) { }

  baseUrl = environment.backend+"/api/Device";
  filter = environment.backend+"/api/Filter";

  // daj sve uredjaje
  getDevices(tip: string){
    return this.http.get(this.baseUrl + `/GetDevicesForMyDevicesPage/${tip}`);
  }

  // daj tipove uredjaja
  getDevicesTypes(){
    return this.http.get(this.baseUrl + `/DeviceTypes`);
  }

  turnOnOff(linkerId:number){
    var obj = {linkerId: linkerId}
    return this.http.put<string>(this.baseUrl + `/TurnOn(Off)Device`, obj);
  }

  setDeviceName(deviceSetName: SetDeviceName){
    return this.http.put<string>(this.baseUrl + `/SetDeviceName`, deviceSetName);
  }

  filterAddDevices(type: string, prosumption: string){
    return this.http.get(this.filter + `/FilterDevicesByTypeAndByProsumption/${type}/${prosumption}`);
  }

  GetDevicesForAddDevicePage(){
    return this.http.get(this.baseUrl + `/GetDevicesForAddDevicePage`);
  }

}
