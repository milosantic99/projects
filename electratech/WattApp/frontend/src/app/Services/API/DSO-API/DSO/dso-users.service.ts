import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DsoUser } from 'src/app/Models/dsoUser';
import { environment } from 'src/app/Enviroments/environment';
import { DSOInformation, DsoBasicInformation } from 'src/app/Models/registerDSO';

export interface OneNotification{
    notificationId: number,
    notificationType: string,   //Delete request or Access request
    prosumerId: string,
    prosumerName: string,
    imageUrl: string
}

@Injectable({
  providedIn: 'root'
})
export class DsoUsersService {

  baseUrl = environment.backend+"/api/Dso";

  constructor(private http: HttpClient) { }

  getAllDispachers(): Observable<DsoUser[]> {
    return this.http.get<DsoUser[]>(this.baseUrl + "/GetAllDsos");
  }

  changeRole(idDso: string): Observable<DsoUser> {
    return this.http.put<DsoUser>(this.baseUrl + '/ChangeRole/' + idDso, null);
  }

  registerDispatcher(idDso: string, newDispatcher: {address: string, email: string, firstName: string, lastName: string, password: string}): Observable<DsoUser> {
    return this.http.post<DsoUser>(this.baseUrl + '/RegisterDispatcher', newDispatcher);
  }

  // ************************************************

  getInformationForDso():Observable<DsoBasicInformation>{
    return this.http.get<DsoBasicInformation>(this.baseUrl+'/GetBasicInformationsForDso');
  }
  getInformationForSettingsByDso():Observable<DSOInformation>{
    return this.http.get<DSOInformation>(this.baseUrl+'/GetDsoById');  
  }
  // NOTIFICATION
  getNotification():Observable<OneNotification[]>{
    return this.http.get<OneNotification[]>(`${environment.backend}/GetAllNotifications`);
  }
    //approve
  acceptAccessRequest(notificationId:number):Observable<any>{
    return this.http.post<any>(`${environment.backend}/AcceptAccessRequest`,notificationId);
  }
  acceptRemoveAccount(notificationId:number):Observable<any>{
    return this.http.post<any>(`${environment.backend}/AcceptDeleteRequest`,notificationId);
  }
    //decline
  declineAccessRequest(notificationId:number):Observable<any>{
    return this.http.post<any>(`${environment.backend}/DeclineAccessRequest`,notificationId);
  }
  declineRemoveAccount(notificationId:number):Observable<any>{
    return this.http.post<any>(`${environment.backend}/DeclineDeleteRequest`,notificationId);
  }
  deleteDispatcher(dispatcherId: string): Observable<any>{
    return this.http.delete<any>(this.baseUrl + "/DeleteDispatcher/" + dispatcherId);
  }
}
