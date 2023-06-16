import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from '../Login/login.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  private jwtHelper: JwtHelperService;
  constructor( private auth:LoginService, private router:Router ) { 
    this.jwtHelper = new JwtHelperService();
  }

  canActivate(): boolean {
    if(!this.auth.auth()){
      return true;
    }
    else if(this.auth.auth()){
      
      const decodedToken = this.auth.getRole();
      switch(decodedToken){
        case "ROLE_DSO":
          this.router.navigate(['HomeDso']);
          break;
        case "ROLE_DISPATCHER":
          this.router.navigate(['HomeDso']);
          break;
        case "ROLE_PROSUMER":
          this.router.navigate(['HomeProsumer']);
          break;
        case "ROLE_PROSUMER_DEMO":
          this.router.navigate(['HomeProsumer']);
          break;
      }
    }
    return false;
  }

}
