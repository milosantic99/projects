import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/app/Enviroments/environment';

@Injectable({
  providedIn: 'root'
})
export class AllProsumersService {

  baseUrl = environment.backend+"/api/Device/OverviewOfConsumptionAndProductionForDsoDateToDate/" as string;
  constructor(private http: HttpClient) {
  }
  
  overviewOfConsumptionAndProductionForDsoDateToDate(date1: string, date2: string): Observable<EnergyData[]> {

    return this.http.get<EnergyData[]>(this.baseUrl + date1 + "/" + date2);
  }
}

export interface EnergyData {
  date: string;
  consumpition: number;
  production: number;
  predictedConsumpition: number;
  predictedProduction: number;
}
