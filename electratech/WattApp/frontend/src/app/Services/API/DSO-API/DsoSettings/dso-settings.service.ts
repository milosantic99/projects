import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/Enviroments/environment';
import { DSOInformation } from 'src/app/Models/registerDSO';

@Injectable({
  providedIn: 'root'
})
export class DsoSettingsService {

  baseUrl = environment.backend+"/api/Dso";

  constructor( private http: HttpClient) { }

  updateDso(companyName: string, email: string, firstName: string, lastName: string, address: string) {
    var obj = {
      companyName: companyName,
      email: email,
      firstName: firstName,
      lastName: lastName,
      adress: address
    }
    console.log(obj);
    return this.http.put(this.baseUrl + '/EditDso' , obj);
  }

  editPassword(password: string, email: string) {
    var obj = {
      password: password,
      email: email
    }
    return this.http.put(this.baseUrl + '/EditPasswordDso' , obj);
  }

  changeImage(imageInBase64:string){
    var obj =  {
      image: imageInBase64
    };

    return this.http.put(this.baseUrl+'/ChangeImage',obj);
  }

}
