import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from 'src/app/Component/snack-bar/snack-bar.component';
import { Prosumer } from 'src/app/Models/registerProsumer';
import { DsoUsersService } from 'src/app/Services/API/DSO-API/DSO/dso-users.service';
import { MapService, locationInt } from 'src/app/Services/API/DSO-API/Map/map.service';
import { ProsumerService } from 'src/app/Services/API/Prosumer-API/ProsumerSoloRegisterUpdate/prosumer.service';
import { LoginService } from 'src/app/Services/API/Security/Login/login.service';
import { ValidationService } from 'src/app/Services/LoginValidation/validation.service';

@Component({
  selector: 'app-register-prosumer-dso',
  templateUrl: './register-prosumer-dso.component.html',
  styleUrls: ['./register-prosumer-dso.component.css']
})
export class RegisterProsumerDsoComponent {
  role:string;
  constructor(private validation: ValidationService, private prosumerService: ProsumerService, private dsoService: DsoUsersService,private locationPros: MapService, private snackBar: MatSnackBar, private login: LoginService) {
    this.role = this.login.getRole();
  }
  bilosta!:string;
  cities = ['Beograd','Bor','Valjevo','Vranje','Vršac','Zaječar','Zrenjanin','Jagodina','Kikinda','Kragujevac','Kraljevo','Kruševac','Leskovac','Loznica','Niš','Novi Pazar','Novi Sad','Pančevo','Pirot','Požarevac','Priština','Prokuplje','Smederevo','Sombor','Sremska Mitrovica','Subotica','Užice','Čačak','Šabac'];


  errInputName = ['', ''];
  errInputSurname = ['', ''];
  errInputEmail = ['', ''];
  errPhoneNumber = '' as string;
  errInputCity = '' as string;
  errInputAddress = ['', ''];
  errInputPassword1 = ['', ''];
  errInputPassword2 = ['', ''];

  prosumer = {} as Prosumer;

  dispatcher: {
    address: string,
    email: string,
    firstName: string,
    lastName: string,
    password: string
  } = {
    address: "",
    email: "",
    firstName: "",
    lastName: "",
    password: ""
  }

  pass1: string[] = ['', ''];
  
  hidePassword = true;
  hidePassword2 = true;
  hidePassword3 = true;
  hidePassword4 = true;
  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }
  togglePasswordVisibility2() {
    this.hidePassword2 = !this.hidePassword2;
  }
  togglePasswordVisibility3() {
    this.hidePassword3 = !this.hidePassword3;
  }
  togglePasswordVisibility4() {
    this.hidePassword4 = !this.hidePassword4;
  }

  testFirstLetterAndLength(input:string,inp_type:string, tab: number){
    if(this.validation.FirstLetterAndLengthTest(input))
    {
      switch(inp_type)
        {
          case "name":
            this.errInputName[tab] = '';
            break;
          case "surname":
            this.errInputSurname[tab] = '';
            break;
          case "city":
            this.errInputCity = '';
            break;
        }
      return true;
    }
    else
    {
      switch(inp_type)
      {
        case "name":
          this.errInputName[tab] = '*Mora početi velikim slovom';
          break;
        case "surname":
          this.errInputSurname[tab] = '*Mora početi velikim slovom';
          break;
        case "city":
          this.errInputCity = '*Mora početi velikim slovom';
          break;
      }
    }
    return false;
  }
  testEmail(email:string, tab: number){
    if (this.validation.EmailTest(email)){
      this.errInputEmail[tab] = '';
      return true;
    }
    this.errInputEmail[tab] = "*Nije validan";
    return false;
  }

  testAddress(address: string, tab: number){
    if(this.validation.AddressTest(address)){
      this.errInputAddress[tab] = '';
      return true;
    }
    this.errInputAddress[tab] = '*Adresa mora biti precizna i tačna';
    return false;
  }

  testPhoneNumber(phone_number: string){
    if (this.validation.PhoneNumberTest(phone_number)){
      this.errPhoneNumber = '';
      return true;
    }
    this.errPhoneNumber = '*Broj telefona mora saržati deset cifara';
    return false;
  }

  testPassword(password: string, tab: number){
    if(this.validation.PasswordTest(password))
    {
      this.errInputPassword1[tab] = '';
      return true;
    }
    this.errInputPassword1[tab] = '*Mora sadržati broj, velika i mala slova';
    return false;
  }

  testPasswordAgain(password1: string, password2: string, tab: number){
    if(this.validation.PasswordTestAgain(password1, password2))
    {
      this.errInputPassword2[tab] = '';
      return true;
    }
    this.errInputPassword2[tab] = '*Lozinka nije odgovarajuća';
    return false;
  }

  openSnackBar(message: string, panelClass: string) {
    this.snackBar.openFromComponent(SnackBarComponent, {
      verticalPosition: 'top',
      horizontalPosition: 'right',
      data: message,
      panelClass: panelClass,
      duration: 2500
    });
  }

  registerProsumer(password1:string,password2:string){
    let check1 = this.testFirstLetterAndLength(this.prosumer.firstName, 'firstName', 0);
    let check2 = this.testFirstLetterAndLength(this.prosumer.lastName, 'firstName', 0);
    let check3 = this.testEmail(this.prosumer.email, 0);
    let check4 = this.testPhoneNumber(this.prosumer.phoneNumber);
    let check8 = this.testFirstLetterAndLength(this.prosumer.city, 'city', 0);
    let check5 = this.testAddress(this.prosumer.address, 0);
    this.prosumer.password = password1;
    let check6 = this.testPassword(this.prosumer.password, 0);
    let check7 = this.testPasswordAgain(password2, this.prosumer.password, 0);
    
    if (check1 && check2 && check3 && check4 && check5 && check6 && check7 && check8){
      this.prosumer.x=this.x_cor;
      this.prosumer.y=this.y_cor;
      this.prosumer.email = this.prosumer.email.trim(); 
      this.prosumerService.registerNewProsumer(this.prosumer)
      .subscribe({
        next: () => {
          this.openSnackBar("Uspešna registracija prosumera", 'snack-bar');
        },
        error: (error) => {
          if(error.error == 'Prosumer with this email already exists')
            this.openSnackBar("Email je već u upotrebi.", "snack-bar");
        }
      });
    }
  }

  registerDispatcher() {
    let check1 = this.testFirstLetterAndLength(this.dispatcher.firstName, 'firstName', 1);
    let check2 = this.testFirstLetterAndLength(this.dispatcher.lastName, 'firstName', 1);
    let check3 = this.testEmail(this.dispatcher.email, 1);
    let check4 = this.testAddress(this.dispatcher.address, 1);
    let check5 = this.testPassword(this.dispatcher.password, 1);
    let check6 = this.testPasswordAgain(this.pass1[1], this.dispatcher.password, 1);
    this.dispatcher.email = this.dispatcher.email.trim(); 
    if (check1 && check2 && check3 && check4 && check5 && check5 && check6)
    this.dsoService.registerDispatcher('b4ae7f72-c105-448a-97b2-62e0209b62f2', this.dispatcher)
    .subscribe({
      next: () => {
        this.openSnackBar("Uspešna registracija dispečera", 'snack-bar');
      },
      error: (error) =>{
        if(error.error == 'Email aleready exists.')
          this.openSnackBar("Email je već u upotrebi.", "snack-bar");
      }
    });
  }
  x_cor!:number
  y_cor!:number
  
  search_address()
  {
    if(this.prosumer.city != null)
    {
      
      var city=`${this.prosumer.city}, ${this.bilosta}`
      this.locationPros.getLocation(city).subscribe(
        response=>{
          var info=response[0] as locationInt;
          this.x_cor=response[0].lat;
          this.y_cor=response[0].lon;  
        }
      )
    }
    else{
      this.errInputAddress[0] = "*Unesite grad";
    }
  }
  search_city(){
    this.errInputAddress[0] = "";
  }
}
