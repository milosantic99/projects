import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/Enviroments/environment';

export interface GetProsumerForSettingsPage{
  firstName: string,
  lastName: string,
  email: string,
  phoneNumber: string,
  image: string
}

export interface UpdateProsumer{
  firstName: string,
  lastName: string,
  email: string,
  phoneNumber: string,
  password: string
}

@Injectable({
  providedIn: 'root'
})
export class SettingsProsumerService {

  baseUrl = environment.backend+"/api/Prosumer";

  constructor(private http: HttpClient) { }

  getProsumerForSettingsPage(){
    return this.http.get<GetProsumerForSettingsPage>(this.baseUrl + '/GetProsumerForSettingsPage');
  }

  updateProsumer(prosumer: UpdateProsumer){
    return this.http.put<GetProsumerForSettingsPage>(this.baseUrl + '/UpdateProsumer', prosumer);
  }

  changeImage(imageBase64: string ){
    var obj = {
      image:imageBase64
    } 
    return this.http.put(this.baseUrl+'/ChangeImageProsumer',obj);
  }

}
