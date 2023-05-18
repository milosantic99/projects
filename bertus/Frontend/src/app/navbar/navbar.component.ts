import { Component } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import { AuthService } from '../_services/auth.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;

  public usernameProfile  = sessionStorage.getItem("username_sess");


  //constructor(private tokenStorageService: TokenStorageService) { }
  constructor(private tokenStorageService: TokenStorageService, private authService: AuthService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      //this.roles = user.roles;
      //this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      //this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

      this.username = user.username;
    }
  }

  logout(): void {
    sessionStorage.clear();
    this.tokenStorageService.signOut();
    window.location.reload();
  }

  public navbarUsername = sessionStorage.getItem("username_sess");
  public navbarEmail = sessionStorage.getItem("email_sess");

  delete(): void
  {
    console.log("Brisem "+this.navbarUsername);
    console.log("Brisem "+this.navbarEmail);
    // this.authService.delete(this.navbarUsername,this.navbarEmail).subscribe({
    // })

    this.authService.delete(this.navbarUsername,this.navbarEmail).subscribe({})
    this.logout();
  }

}
