import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/Enviroments/environment';
import { Prosumer } from 'src/app/Models/registerProsumer';

@Injectable({
  providedIn: 'root'
})
export class ProsumerService {
  baseUrl = environment.backend+"/api/Prosumer";


  constructor(private http: HttpClient) { }

  registerNewProsumer(newProsumer: Prosumer): Observable<Prosumer> {
    return this.http.post<Prosumer>(this.baseUrl + "/RegisterProsumer", newProsumer);
  }
  registerNewProsumerSolo(newProsumer: Prosumer): Observable<Prosumer> {
    return this.http.post<Prosumer>(this.baseUrl + "/RegisterProsumerSolo", newProsumer);
  }

}
