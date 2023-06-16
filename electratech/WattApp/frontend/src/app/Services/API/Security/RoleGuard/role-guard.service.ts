import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { LoginService } from '../Login/login.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate {

  private jwtHelper: JwtHelperService;
  constructor(private auth:LoginService, private router:Router) {
    this.jwtHelper = new JwtHelperService();
   }
  canActivate(route: ActivatedRouteSnapshot): boolean {
    if(!this.auth.auth()){
      this.router.navigate(['login']);
      return false;
    }
    const excepterdRole = route.data['excepterdRole'];
    const decodedToken = this.auth.getRole(); 
    const token = this.auth.getToken();
    
    if(decodedToken==null || this.jwtHelper.isTokenExpired(token))
    {
      sessionStorage.clear();
      localStorage.clear();
      window.open('/error','_self');
      return false;
    }
    
    var inExcepted = false;
    excepterdRole.forEach((element: any) => {
      if(element == decodedToken)
        inExcepted = true;
    });
    if(inExcepted==false){
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
        default:
          localStorage.clear();
          sessionStorage.clear();  
          window.open('/error','_self');
          break;
      }
      return false;
    }
    return true;
  }
}
