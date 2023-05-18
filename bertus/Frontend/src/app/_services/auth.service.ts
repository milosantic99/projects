import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Host } from 'src/host';

var backendUrl = Host.getUrl();
var AUTH_API = backendUrl + '/api/Authentication/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(username: string, password: string) : Observable<HttpResponse<string>>{
    return this.http.post<string>(AUTH_API + 'login', {
      username,
      password
    },
    {
      observe : "response"
    });
  }
  
  register(name: string, surname: string, username: string, email: string, password: string, confirmPassword: string): Observable<any>  {
    return this.http.post(AUTH_API + 'register', 
    {
      name,
      surname,
      email,
      username,
      password,
      confirmPassword
    }, httpOptions);
  }

  delete(username: string,email: string) : Observable<any>{
    console.log("Brisem "+username)

    let op = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body: 
      {
        username,
        email,
      }
    };
    
    return this.http.delete<string>(AUTH_API + 'delete',op); 
    // body:
    // {
    //   username : Username,
    //   //email
    // });
    // {
    //   observe : "response"
    // });
  }

  // , password: string, confirmPassword: string
  update(name: string, surname: string, username: string, email: string): Observable<any>  {
    return this.http.put(AUTH_API + 'update', 
    {
      name,
      surname,
      email,
      username,
      // password,
      // confirmPassword
    }, httpOptions);
  }

  getAllUsers() : Observable<HttpResponse<string>>{
    return this.http.post<string>(AUTH_API + 'getAllUsers', 
    {
      
    },
    {
      observe : "response"
    });
  }


  loggedIn(){
    if(sessionStorage.getItem("username") != null)
      return true
    else 
      return false
  }


}