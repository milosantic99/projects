import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from 'src/app/Models/login';
import { Location } from '@angular/common';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/app/Enviroments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private jwtHelper: JwtHelperService;
  constructor(private router:Router,private http:HttpClient, private location:Location) {
    this.jwtHelper = new JwtHelperService();
   }

    baseUrl = environment.backend+"/api/Authenticate";

    login(loginObj: Login):Observable<any>{
      return this.http.post(this.baseUrl,loginObj);
    }

    auth():boolean{
      if(localStorage.getItem('id_token'))
        return true;
      return false;
    }

    setSession(authResult:any){
      localStorage.setItem('id_token',authResult.token);
    }

    getRole(){
      var token = localStorage.getItem('id_token');
      if(token != null)
      {
        const decodedToken = this.jwtHelper.decodeToken(token);
        return decodedToken.role;
      }
      return null;
    }

    getToken(){
      var token = localStorage.getItem('id_token');
      if(token != null)
        return token;
      return null;
    }

    insertIn(authResult:any){
      const decodedToken = this.getRole();
      // const decodedToken = this.jwtHelper.decodeToken(authResult.token);
      // localStorage.setItem('role',decodedToken.role);
      switch(decodedToken){
        case 'ROLE_DSO':
          window.open("/HomeDso","_self");
          break;  
        case 'ROLE_DISPATCHER':
          window.open("/HomeDso","_self");
          break; 
        case 'ROLE_PROSUMER':
          window.open("/HomeProsumer","_self");
          sessionStorage.setItem('AddDevices','[]');
          break;
        case 'ROLE_PROSUMER_DEMO':
          window.open("/HomeProsumer","_self");
          sessionStorage.setItem('AddDevices','[]');
          break;
      }
    }

    logout(){
      localStorage.clear();
      sessionStorage.clear();
      window.open("/login","_self");
    }

}
