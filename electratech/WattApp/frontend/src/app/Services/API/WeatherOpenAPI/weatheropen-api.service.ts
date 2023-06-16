import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/app/Enviroments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatheropenApiService {

  constructor(private http: HttpClient) { }
  
  private apikey: string = environment.weatherAPIKey;

  getFiveDaysForecast(): Observable<any>{
    return this.http.get('//api.openweathermap.org/data/2.5/forecast?q=Kragujevac&cnt=40&units=metric&appid=' + this.apikey);
  }
}
