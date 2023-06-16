import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

// Icon
import { faHouse, faUsers, faChartLine, faClockRotateLeft,faUserPlus, faScrewdriverWrench, faGear, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { LoginService } from 'src/app/Services/API/Security/Login/login.service';
import { DsoUsersService } from 'src/app/Services/API/DSO-API/DSO/dso-users.service';
import { DsoBasicInformation } from 'src/app/Models/registerDSO';
import { ImageBase64Service } from 'src/app/Services/ImageBase64/image-base64.service';

@Component({
  selector: 'app-left-meni',
  templateUrl: './left-meni.component.html',
  styleUrls: ['./left-meni.component.css']
})
export class LeftMeniComponent implements OnInit {
  faHouse = faHouse;
  faUsers = faUsers;
  faChartLine = faChartLine
  faClockRotateLeft=faClockRotateLeft;
  faUserPlus=faUserPlus;
  faScrewdriverWrench = faScrewdriverWrench;
  faGear = faGear;
  faRightFromBracket = faArrowLeft;

  role!:string;
  constructor(private router:Router, private location : Location, private login:LoginService, private dsoService : DsoUsersService, private image: ImageBase64Service){
    this.getInformationForDso();
    this.role = this.login.getRole();
  }

  ngOnInit(): void {
  }

  setSelected(selected:string){
    this.goToLink(selected);
  }

  logOut(){
    this.login.logout();
  }

  goToLink(url:string){
    switch(url){
      case 'SviKorisnici':
        this.router.navigate(['AllProsumersTable']);
        break;
      case 'Pocetna':
        this.router.navigate(['HomeDso']);
        break;
      case 'Administracija':
        this.router.navigate(['UserAdministration']);
        break;
      case 'DodavanjeKorisnika':
        this.router.navigate(['RegisterProsumer']);
        break;
      case 'ProsumptionAnalysis':
        this.router.navigate(['ProsumptionAnalysis']);
      break;
        case 'Podesavanja':
        this.router.navigate(['SettingsDso']);
        break;
    }
    
  }
  dsoInformation = {} as DsoBasicInformation;
  profilePictue!:any;
  getInformationForDso(){
    
    this.dsoService.getInformationForDso().subscribe(
      response=>{
        this.dsoInformation = response;
        this.profilePictue = this.image.getPicture(this.dsoInformation.image);
      }
    );
  }

}
