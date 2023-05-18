import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-delete-user-popup',
  templateUrl: './delete-user-popup.component.html',
  styleUrls: ['./delete-user-popup.component.css']
})
export class DeleteUserPopupComponent implements OnInit {

  constructor(
              private tokenStorageService : TokenStorageService,
              private dialog : MatDialog,
              private authService : AuthService,
              private router : Router
              ) { }

              public usernameProfile  = sessionStorage.getItem("username_sess");
              public emailProfile     = sessionStorage.getItem("email_sess");

  openDialog(): void{
    this.dialog.open(DeleteUserPopupComponent);
  }

  closeDialog() : void{
    this.dialog.closeAll();
  }

    /*Brisanje korisnika*/
    deleteUser(): void{
      this.authService.delete(this.usernameProfile,this.emailProfile).subscribe({})
      this.logout();
      
      this.router.navigate(['/'])
          .then(() => {
            this.logout();
            window.location.reload();
          });
      //this.logout();
    }
  
    logout(): void {
      //sessionStorage.clear();

      window.sessionStorage.clear();
      this.tokenStorageService.signOut();
      window.location.reload();
    }
  
    reloadPage(): void {
      window.location.reload();
    }
  
  

  ngOnInit(): void {
  }

}
