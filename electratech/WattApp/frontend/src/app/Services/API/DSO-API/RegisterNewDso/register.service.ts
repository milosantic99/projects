import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/Enviroments/environment';
import { registerDSO } from 'src/app/Models/registerDSO';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  baseUrl = environment.backend+"/api/Dso";

  constructor( private http: HttpClient) { }

  registerNewDso(newDso : registerDSO){
    return this.http.post(this.baseUrl + '/RegisterDso' , newDso);
  }

}
