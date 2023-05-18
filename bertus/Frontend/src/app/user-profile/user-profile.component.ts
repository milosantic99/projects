import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';

import { TokenStorageService } from '../_services/token-storage.service';
import { ToastrService } from 'ngx-toastr';

import { MatDialog } from '@angular/material/dialog';
import { DeleteUserPopupComponent } from '../delete-user-popup/delete-user-popup.component';

import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import jwt_decode from 'jwt-decode';

import { ViewEncapsulation } from '@angular/core'; 
import { repeat } from 'rxjs';
import { Template } from '@angular/compiler/src/render3/r3_ast';
import { AdminUserPopupComponent } from '../admin-user-popup/admin-user-popup.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],

 
  
})
export class UserProfileComponent implements OnInit {

  form: any = {
    name : null,
    surname : null,
    username: null,
    email: null,
    password: null,
    confirmPassword: null,
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  isAdmin = false;
 
  public firstNameProfile = sessionStorage.getItem("firstName_sess");
  public lastNameProfile  = sessionStorage.getItem("lastName_sess");
  public usernameProfile  = sessionStorage.getItem("username_sess");
  public emailProfile     = sessionStorage.getItem("email_sess");
  public passwordProfile  = sessionStorage.getItem("password_sess");

  
  htmlVariable: string = "<button> Dugme </button>";
  
  //

  // constructor(private authService: AuthService, private router: Router) { }

  constructor( 
    private tokenStorageService: TokenStorageService,
    private authService: AuthService,
    private router: Router , 
    private toastr: ToastrService,
    private dialog: MatDialog
    ) { }

  
  ngOnInit(): void {
    if(this.usernameProfile === "admin"){
      this.isAdmin = true;
      this.allUsers();
    }
  }
  
  onSubmit(): void {
    const {name, surname, username, email, password, confirmPassword } = this.form;
    
  }


  //Editovanje korisnika
  editUser() : void
  {
    //First Name
    var firstNameEdt = this.form.name;
    if(firstNameEdt == null){
      firstNameEdt = this.firstNameProfile;
    }
    else{
      sessionStorage.setItem("firstName_sess",firstNameEdt);
      this.firstNameProfile = firstNameEdt;
    }

    //Last Name
    var lastNameEdt = this.form.surname;
    if(lastNameEdt == null){
      lastNameEdt = this.lastNameProfile;
    }
    else{
      sessionStorage.setItem("lastName_sess",lastNameEdt);
      this.lastNameProfile = lastNameEdt;
    }

    //Mail
    var emailEdt = this.form.email;
    if(emailEdt == null){
      emailEdt = this.emailProfile;
    }
    else{
      sessionStorage.setItem("email_sess",emailEdt);
      this.emailProfile = emailEdt;
    }

    //alert(firstNameEdt+" "+lastNameEdt+" "+lastNameEdt+" "+emailEdt);
    //console.log("Updejtujem");

    this.authService.update(firstNameEdt, lastNameEdt, this.usernameProfile, emailEdt).subscribe({
      next: data => {
        this.reloadPage();
        //this.router.navigate(['']);
      },
      error: err => {
          this.errorMessage = err.error.message;
          this.isSignUpFailed = true;
        }
      });
      this.toastr.success("Your information has been updated successfully");
      setTimeout(() => {this.reloadPage()},3000);
      //this.reloadPage();
  }


  //Brisanje korisnika
  deleteUser(): void{
    this.authService.delete(this.usernameProfile,this.emailProfile).subscribe({})
    
    this.router.navigate(['/'])
        .then(() => {
          this.logout();
          window.location.reload();
        });
    
    //this.logout();
  }


  //Dijalozi
  openDialog(): void{
    this.dialog.open(DeleteUserPopupComponent);
  }

  openDialogAdmin(selectedUser:string):void
  {

    this.users.forEach(u => {
      if(u.user === selectedUser){
        sessionStorage.setItem('username_admin',  u.user );
        sessionStorage.setItem('firstName_admin', u.name );
        sessionStorage.setItem('lastName_admin',  u.last );
        sessionStorage.setItem('email_admin',     u.email);
      }
    });

    this.dialog.open(AdminUserPopupComponent, {
      data: {
          title: "NWAS NTD"
      },
      width: '750px',
      height: '800px',
      panelClass: 'epsSelectorPanel'
    } );
  }

  logout(): void {
    sessionStorage.clear();
    this.tokenStorageService.signOut();
    window.location.reload();
  }

  reloadPage(): void {
    window.location.reload();
  }


  //Select user
  selectUser(user:string) : void
  {
      console.log(user);
      this.openDialogAdmin(user);
  }
  
  public users:{ 
    id:string; 
    name:string; 
    last:string;
    user: string;
    email: string; 
  }[] = [];
    
  allUsers(): void
  {
      // var users:{ name: string; user: string }[] = [];
    
      this.authService.getAllUsers().subscribe(
      (data : HttpResponse<string>) => {

        this.tokenStorageService.saveToken(data.body ? data.body : "");
        this.tokenStorageService.saveUser(data);

        //Dekodiranje niza tokena
        var s = data.body.toString();
        var n = data.body.length;
        var str = s.split(",", n); 

        this.users = [];
        
        var i = 0,j = 0;
        str.forEach(s => 
        {
            var dek = jwt_decode(str[i]);
            // console.log(dek);
 
            var username_admin  = sessionStorage.setItem('username_admin',   dek['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'][0]);
            var firstName_admin = sessionStorage.setItem('firstName_admin',  dek['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'][1]);
            var lastName_admin  = sessionStorage.setItem('lastName_admin',   dek['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'][2]);
            var email_admin     = sessionStorage.setItem('email_admin',      dek['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress']);
            i++; 
            var name = sessionStorage.getItem('firstName_admin'); 
            var last = sessionStorage.getItem('lastName_admin');
            var user = sessionStorage.getItem('username_admin'); var userID = "usr"+i;
            var email = sessionStorage.getItem('email_admin');   var mailID = "mail"+i;

            //Pretraga korisnika
            var search = (<HTMLInputElement> document.getElementById("searchBar")).value;
            if(search === "" || user.includes(search) || name.includes(search) || last.includes(search) || email.includes(search))
            {
              //Kreiranje usera i dodavanje u niz
              var userObj = new User(i,name,last,user,email); /*Broj korisnika*/j++;
              this.users.push({ id:userObj.id, name:userObj.name, last:userObj.last, user:userObj.user, email:userObj.mail});
            }
        });

        //Broj korisnika u nizu
        document.getElementById("numberUsers").innerHTML = j.toString();
        
        //console.log(data.body.toString());
        var tkn = (sessionStorage.setItem('allUsers',data.body['token']));
        var tknString = sessionStorage.getItem("allUsers");
      },
      (err : HttpErrorResponse) => {
        this.errorMessage = err.error.message;
        alert("Greska");
      });
  }

  isAdminCheck() : boolean
  {
    alert(this.isAdmin);
    console.log(this.usernameProfile+" "+this.isAdmin);
      return this.isAdmin;
  }
}


//Klasa korisnik
class User 
{
  public id:string;
  public name:string;
  public last:string;
  public user: string;
  public mail:string;
  
  constructor(id,name,last,user,mail) {
    this.id = id;
    this.name = name;
    this.last = last;
    this.user = user;
    this.mail = mail;
  }

  public tell():void
  {
    //alert(this.user+" "+this.id);
  }
}



// import { Component, OnInit } from '@angular/core';
// import { RouterLink } from '@angular/router';
// import { AuthService } from '../_services/auth.service';

// /**/
// import {Router} from '@angular/router';


// @Component({
//   selector: 'app-register',
//   templateUrl: './register.component.html',
//   styleUrls: ['./register.component.css']
// })
// export class RegisterComponent implements OnInit {

//   form: any = {
//     name : null,
//     surname : null,
//     username: null,
//     email: null,
//     password: null,
//     confirmPassword: null
//   };
//   isSuccessful = false;
//   isSignUpFailed = false;
//   errorMessage = '';

//   constructor(private authService: AuthService, private router: Router) { }
  
//   ngOnInit(): void {
//   }
  
//   onSubmit(): void {
//     const {name, surname, username, email, password, confirmPassword } = this.form;
//     this.authService.register(name, surname, username, email, password, confirmPassword).subscribe({
//       next: data => {
//         //console.log(data);
//         this.isSuccessful = true;
//         this.isSignUpFailed = false;

//         this.router.navigate(['']);

//       },
//       error: err => {
//         this.errorMessage = err.error.message;
//         this.isSignUpFailed = true;
//       }
//     });
//   }
// }


//JS dodavanje
// var header = "<tr><th> ID </th><th> FirstName </th><th> LastName </th>"+
//"<th> Username </th><th> Email </th><th> Options    </th></tr>";    
// document.getElementById("adminTable").innerHTML = header;

// var html = "<tr><td>"+i+"</td><td>"+name+" </td><td>"+last+"</td> <td id="+userID+">"+user+"</td> <td id="+mailID+">"+email+"</td>"+ 
//            "<td> <button (click)=\"selectUser()\"  id=\"selectUser\"> Select User </button> </td> </tr>";
// document.getElementById("adminTable").innerHTML += html; j++;
