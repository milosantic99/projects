import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-admin-user-popup',
  templateUrl: './admin-user-popup.component.html',
  styleUrls: ['./admin-user-popup.component.css']
})
export class AdminUserPopupComponent implements OnInit {


  form: any = {
    name : null,
    surname : null,
    username: null,
    email: null,
  };

  public firstNameAdmin = "NULL";
  public lastNameAdmin  = "NULL";
  public usernameAdmin  = "NULL";
  public emailAdmin     = "NULL";

  // if(sessionStorage.getItem('username_admin')==undefined)
  // {
  //   firstNameAdmin = sessionStorage.getItem("firstName_admin");
  //   lastNameAdmin  = sessionStorage.getItem("lastName_admin");
  //   usernameAdmin  = sessionStorage.getItem("username_admin");
  //   emailAdmin     = sessionStorage.getItem("email_admin");
  // }

  constructor(
    private tokenStorageService : TokenStorageService,
    private dialog : MatDialog,
    private authService : AuthService,
    private router : Router,
    private toastr: ToastrService,
    ) { }
 

  ngOnInit(): void {
    var usr = sessionStorage.getItem("username_admin");
    if(usr !== undefined)
    {
      this.firstNameAdmin = sessionStorage.getItem("firstName_admin");
      this.lastNameAdmin = sessionStorage.getItem("lastName_admin");
      this.usernameAdmin = sessionStorage.getItem("username_admin");
      this.emailAdmin = sessionStorage.getItem("email_admin");
    }
  }


  //BRISANJE KORISNIKA
  deleteUser(): void{
    this.authService.delete(this.usernameAdmin,this.emailAdmin).subscribe({})
   
    this.toastr.error("Your successfully deleted user");
    //setTimeout(() => {this.reloadPage()},3000);

    this.router.navigate(['/user-profile'])
        .then(() => {
          setTimeout(() => {this.reloadPage()},3000);
          this.logout();
          window.location.reload();
        }); 
  }

  logout(): void {
    //sessionStorage.clear();
    //window.sessionStorage.clear();
    //this.tokenStorageService.signOut();
    window.location.reload();
  }

  reloadPage(): void {
    window.location.reload();
  }
xa

  closeDialog() : void{
    this.dialog.closeAll();
  }


  
  //BRISANJE KORISNIKA
  editUser() : void
  {
    //First Name
    var firstNameEdt = this.form.name;
    if(firstNameEdt == null){
      firstNameEdt = this.firstNameAdmin;
    }
    else{
      sessionStorage.setItem("firstName_sess",firstNameEdt);
      this.firstNameAdmin = firstNameEdt;
    }

    //Last Name
    var lastNameEdt = this.form.surname;
    if(lastNameEdt == null){
      lastNameEdt = this.lastNameAdmin;
    }
    else{
      sessionStorage.setItem("lastName_sess",lastNameEdt);
      this.lastNameAdmin = lastNameEdt;
    }

    //Mail
    var emailEdt = this.form.email;
    if(emailEdt == null){
      emailEdt = this.emailAdmin;
    }
    else{
      sessionStorage.setItem("email_sess",emailEdt);
      this.emailAdmin = emailEdt;
    }

    //alert(firstNameEdt+" "+lastNameEdt+" "+lastNameEdt+" "+emailEdt);
    //console.log("Updejtujem");

    this.authService.update(firstNameEdt, lastNameEdt, this.usernameAdmin, emailEdt).subscribe({
      next: data => {
        this.reloadPage();
        //this.router.navigate(['']);
      },
      error: err => {
        
        }
      });
      this.toastr.success("Your information has been updated successfully");
      setTimeout(() => {this.reloadPage()},3000);
      //this.reloadPage();
  }


 

}

