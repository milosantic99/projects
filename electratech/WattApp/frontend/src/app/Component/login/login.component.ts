import { Component} from '@angular/core';
import { Login } from 'src/app/Models/login';
import { LoginService } from 'src/app/Services/API/Security/Login/login.service'; 
import { ValidationService } from 'src/app/Services/LoginValidation/validation.service';
import { throwError,catchError,of} from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {
  
  loginModel = {} as Login;
  
  errInputEmail = '' as string;
  errInputPassword= '' as string;

  passwordFieldType: string = "password";

  isLoading : any = false;

  constructor(private router:Router,private loginService:LoginService, private validation: ValidationService){
    this.loginModel.email = "";
    this.loginModel.password = "";
  }

  togglePasswordFieldType(){
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }

  goToLogin(){
    this.router.navigate(['register']);
  }
  
  submit(){  
    this.loginModel.email = this.loginModel.email.trim(); 
    if(!this.validation.EmailTest(this.loginModel.email) || !this.validation.PasswordTest(this.loginModel.password)) 
    {
      this.errInputPassword="Email ili lozinka nisu ispravni";
      return;
    }
    this.errInputEmail="";
    this.errInputPassword="";
    this.isLoading = true;
    this.loginService.login(this.loginModel)
      .pipe(
        catchError((error)=>{
          return of(error);
        })
      )
      .subscribe(
        (response)=>{
          if(response.status == 400){
            this.isLoading = false;
            this.errInputPassword = "Email ili lozinka nisu ispravni";
            return;
          }
          this.loginService.setSession(response);
          this.loginService.insertIn(response);
        }
      )
    
  }
}
