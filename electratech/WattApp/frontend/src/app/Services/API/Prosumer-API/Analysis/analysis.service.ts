import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/Enviroments/environment';
import { SumCardAnalysis } from 'src/app/Pages/Prosumer/analysis-prosumer/analysis-prosumer.component';

@Injectable({
  providedIn: 'root'
})
export class AnalysisService {
  getProductionInCurrentMonthForProsumer() {
    throw new Error('Method not implemented.');
  }

  baseUrl = environment.backend+"/api/Device";
  baseUrlRequest = environment.backend+"/AccessRequest";

  constructor(private http: HttpClient) { }

  // dnevna
  getOverviewOfDailyConsumptionAndProductionWithPredictionForProsumer() {
    return this.http.get(this.baseUrl + `/OverviewOfDailyConsumptionAndProductionWithPredictionForProsumer`);
  }

  // nedeljna
  getOverviewOfWeeklyConsumptionAndProductionWithPredictionForProsumer() {
    return this.http.get(this.baseUrl + `/OverviewOfWeeklyConsumptionAndProductionWithPredictionForProsumer`);
  }

  // mesecna
  getOverviewOfMonthlyConsumptionAndProductionWithPredictionForProsumer() {
    return this.http.get(this.baseUrl + `/OverviewOfMonthlyConsumptionAndProductionWithPredictionForProsumer`);
  }

  // suma
  getConsumptionAndProductionInCurrentMonthForProsumer():Observable<SumCardAnalysis[]> {
    return this.http.get<SumCardAnalysis[]>(this.baseUrl + `/ConsumptionAndProductionInCurrentMonthForProsumer`);
  }

  //posaljiZahtev
  sendRequestDso(){
    // SETOVATI DSOID
    var obj={
      dsoId:"E3449163-A104-487B-A4A8-E8B9C44C73A6"
    }
    return this.http.post(this.baseUrlRequest,obj);
  }

}
