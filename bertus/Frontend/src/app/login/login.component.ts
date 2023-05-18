
import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import { AuthService } from '../_services/auth.service';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { DataTransferService } from '../data-transfer.service';

import jwtDecode from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: any = {
    username: null,
    password: null
  };

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  
  constructor(
      private authService: AuthService, 
      private tokenStorage: TokenStorageService,
      
      private router : Router,
      private dataTransfer: DataTransferService,
      public http: HttpClient
    ) 
    { }
  
  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
      localStorage.clear();
    }
  }

  onSubmit(): void {
    const { username, password } = this.form;

   
    this.authService.login(username, password).subscribe(  
    (data : HttpResponse<string>) => 
    {
        //this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveToken(data.body ? data.body : data.body);
        this.tokenStorage.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;

        this.dataTransfer.changeUsername(username)
        sessionStorage.setItem("username", username);

        //Uzimanje i dekodiranje tokena
        

        //sessionStorage.clear();
        this.authService.login(username,password).subscribe(  
          (data : HttpResponse<string>) => 
          {
            var userToken = (sessionStorage.setItem('userToken',data.body['token']));
            var userTokenString = sessionStorage.getItem("userToken");
            var dek = jwtDecode(userTokenString);
            
            var userName_sess  = sessionStorage.setItem('username_sess',   dek['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'][0]);
            var firstName_sess = sessionStorage.setItem('firstName_sess',  dek['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'][1]);
            var lastName_sess  = sessionStorage.setItem('lastName_sess',   dek['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'][2]);
            var email_sess     = sessionStorage.setItem('email_sess',      dek['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress']);
          } , 
          (err : HttpErrorResponse) => {this.errorMessage = err.error.message;
            this.isLoginFailed = true;
          });

        //window.location.reload();
        this.router.navigate(['/home'])
        .then(() => {
          window.location.reload();
        });
        
        
        // setTimeout(() => 
        // {
        //     console.log("ok")
        //     this.router.navigate(['/']);
        // },
        // 5000);
      },
      (err : HttpErrorResponse) => {
        this.errorMessage = err.error.message;
        /*dbg*/
        console.log(this.tokenStorage.getToken());
        this.isLoginFailed = true;
      });
  }

  changeUsername(username){
    this.dataTransfer.changeUsername(username)
  }
  
  reloadPage(): void {
    window.location.reload();
  }

  // delay(ms: number) {
  //   return new Promise( resolve => setTimeout(resolve, ms) );
  // }
}



// function jwt_decode(userTokenString: string) {
//   throw new Error('Function not implemented.');
// } 


  // var userToken = (sessionStorage.setItem('userToken',data.body['token']));
  // var userTokenString = sessionStorage.getItem("userToken");

  // var dek = jwtDecode(userTokenString);
  // var userName_sess  = sessionStorage.setItem('username_sess',   dek['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'][0]);
  // var firstName_sess = sessionStorage.setItem('firstName_sess',  dek['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'][1]);
  // var lastName_sess  = sessionStorage.setItem('lastName_sess',   dek['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'][2]);
  // var email_sess     = sessionStorage.setItem('email_sess',      dek['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress']);
