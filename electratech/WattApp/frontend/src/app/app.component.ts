import { Component, HostListener, OnInit } from '@angular/core';
import { LoginService } from './Services/API/Security/Login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'frontend';
  
  getScreenWidth:any;
  getScreenHeight:any;
  menu:any;
  auth:boolean;
  role:string;
  constructor(login:LoginService)
  {
    this.auth = login.auth();
    this.role = login.getRole(); 
  }

  ngOnInit(): void {
    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;
    this.setMenu();
  }

  setMenu(){
    if(this.getScreenWidth > 480)
      this.menu = 'left';
    else 
      this.menu = 'bottom';
  }

  @HostListener('window:resize',['$event'])  onWindowResize(){
    this.getScreenWidth = window.outerWidth;
    this.getScreenHeight = window.innerHeight;
    this.setMenu();
    // console.log(this.getScreenWidth);
  }

}
