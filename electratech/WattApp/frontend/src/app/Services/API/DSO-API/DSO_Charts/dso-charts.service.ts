import { Injectable } from '@angular/core';
import { environment } from 'src/app/Enviroments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GraphInfo } from 'src/app/Models/GraphInfo';
import { AllInOneSimpleCard } from 'src/app/Models/AllInOneSimpleCard';

export interface ProsumerPageDsoBarChart{
  name:string,
  prosumption:number
}

export interface PredictedConsumptionLineChart{
  date:string,
  predictedConsumption:number
}

export interface PredictedConsumptionLineChartSecound{
  date:string,
  consumption:number,
  predictedConsumption: number
}

export interface ProsumerProductionForThisMonth{
  date: string,
  predictedProduction: number,
  production: number
}

export interface OverviewConsumption{
  date: string,
  consumption: number,
  prediction: number,
}

export interface OverviewProduction{
  date: string,
  production: number,
  prediction: number,
}

export interface TableDorDsoAnalysis {
  month: string,
  consumption: number,
  predictedConsumption: number,
  production: number,
  predictedProduction: number
}


@Injectable({
  providedIn: 'root'
})
export class DsoChartsService {
 
  baseUrl = environment.backend+"/api/Device";
 
  constructor(private http: HttpClient) { }

  // HomeDso
  getConsumptionForWeek(): Observable<GraphInfo[]>{
    return this.http.get<GraphInfo[]>(this.baseUrl+"/GetConsumptionForWeek");
  }
  
  getConsumptionForPastWeek(): Observable<GraphInfo[]>{
    return this.http.get<GraphInfo[]>(this.baseUrl+"/GetConsumptionForPastWeek");
  }

  getAllInOneSimpleCard(): Observable<AllInOneSimpleCard[]>{
    return this.http.get<AllInOneSimpleCard[]>(this.baseUrl+'/AllInOneSimpleCard');
  }

  //ProsumerPageDso
  // BAR-chart
  getProsumerConsumptionForBarChart(prosumerId:string): Observable<ProsumerPageDsoBarChart[]>{
    return this.http.get<ProsumerPageDsoBarChart[]>(this.baseUrl+'/ProsumerCounsumptionForLastMonth/'+prosumerId);
  }

  getProsumerConsupmtionForThisMonth(prosumerId:string):Observable<PredictedConsumptionLineChartSecound[]>{
    return this.http.get<PredictedConsumptionLineChartSecound[]>(this.baseUrl+'/ProsumerConsupmtionForThisMonth/'+prosumerId);
  }

  getProsumerProductionForThisMonth(prosumerId:string):Observable<ProsumerProductionForThisMonth[]>{
    return this.http.get<ProsumerProductionForThisMonth[]>(this.baseUrl+'/ProsumerProductionForThisMonth/'+prosumerId);
  }

  // Analiza
  getOverviewOfConsumptionForDsoMonths():Observable<OverviewConsumption[]>{
    return this.http.get<OverviewConsumption[]>(this.baseUrl+'/OverviewOfConsumptionForDsoMonths');
  }

  getOverviewOfProductionForDsoMonths():Observable<OverviewProduction[]>{
    return this.http.get<OverviewProduction[]>(this.baseUrl+'/OverviewOfProductionForDsoMonths')
  }

  getTabela():Observable<TableDorDsoAnalysis[]>{
    return this.http.get<TableDorDsoAnalysis[]>(this.baseUrl+'/TableForDsoAnalysis');
  }

}
