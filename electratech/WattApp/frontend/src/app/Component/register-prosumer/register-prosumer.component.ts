import { Component } from '@angular/core';
import { ValidationService } from 'src/app/Services/LoginValidation/validation.service'; 
import { ProsumerService } from 'src/app/Services/API/Prosumer-API/ProsumerSoloRegisterUpdate/prosumer.service';
import { Register } from 'src/app/Models/register';
import { Router } from '@angular/router';
import { MapService, locationInt } from 'src/app/Services/API/DSO-API/Map/map.service';
import { faL } from '@fortawesome/free-solid-svg-icons';
import { SnackBarComponent } from '../snack-bar/snack-bar.component';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-register-prosumer',
  templateUrl: './register-prosumer.component.html',
  styleUrls: ['./register-prosumer.component.css']
})
export class RegisterProsumerComponent {
  

  errInputName = '' as string;
  errInputSurname = '' as string;
  errInputEmail = '' as string;
  errInputCity='' as string;
  errInputAddress = '' as string;
  errInputNumber='' as string;
  errInputPassword1 = '' as string;
  errInputPassword2 = '' as string;
  constructor( private router:Router,  private prosumerService : ProsumerService, private _validation: ValidationService,private locationPros: MapService,private snackBar: MatSnackBar)
  {
    
  }
  bilosta!:string;
  passwordFieldType: string = "password";
  passwordFieldTypeTest: string = "password";
  cities = ['Beograd','Bor','Valjevo','Vranje','Vršac','Zaječar','Zrenjanin','Jagodina','Kikinda','Kragujevac','Kraljevo','Kruševac','Leskovac','Loznica','Niš','Novi Pazar','Novi Sad','Pančevo','Pirot','Požarevac','Priština','Prokuplje','Smederevo','Sombor','Sremska Mitrovica','Subotica','Užice','Čačak','Šabac'];
  searchCityInput !:string;
  newProsumer = {
    // firstName: "Bogdan",
    // lastName: "Lukić",
    // email: "boca@gmail.com",
    // password: "Bogdan123",
    // address: "Pristinska 4",
    // phoneNumber: "0692002171",
  } as Register;
  
  search_city(){
    this.errInputCity = "";
  }

  x_cor!:number
  y_cor!:number
  search_address()
  {
    if(this.newProsumer.city != null)
    {
      
      var city=`${this.newProsumer.city}, ${this.bilosta}`
      this.locationPros.getLocation(city).subscribe(
        response=>{
          var info=response[0] as locationInt;
          this.x_cor=response[0].lat;
          this.y_cor=response[0].lon;  
        }
      )
    }
    else{
      this.errInputCity = "*Unesite grad";
    }
  }

  pass1: string = '';

  get validation(){
    return this._validation;
  }

  goToLogin(){
    this.router.navigate(['login']);
  }

  testFirstLetterAndLength(input:string,inp_type:string){
    if(this.validation.FirstLetterAndLengthTest(input))
    {
      switch(inp_type)
      {
          case "name":
            this.errInputName = '';
            break;
          case "surname":
            this.errInputSurname = '';
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
          this.errInputName = '*Mora početi velikim slovom';
          break;
        case "surname":
          this.errInputSurname = '*Mora početi velikim slovom';
          break;
          
          case "city":
            this.errInputCity = '*Mora početi velikim slovom';
            break;
      }
    }
    return false;
    }
  testEmail(email:string){
    if (this.validation.EmailTest(email)){
      this.errInputEmail = '';
      return true;
    }
    this.errInputEmail = "*Nije validan";
    return false;
  }

  testAddress(address: string){
    if(this.validation.AddressTest(address)){
      this.errInputAddress = '';
      return true;
    }
    this.errInputAddress = '*Adresa mora biti precizna i tačna';
    return false;
  }

  testPhoneNumber(number:string){
    if(this.validation.PhoneNumberTest(number))
    {
      this.errInputNumber='';
      return true;
    }
    this.errInputNumber = '*Broj telefona nema odgovarajući broj cifara';
    return false;
  }

  testPassword(password: string){
    if(this.validation.PasswordTest(password))
    {
      this.errInputPassword1 = '';
      return true;
    }
    this.errInputPassword1 = '*Mora sadržati broj, velika i mala slova i najmanje 8 karaktera';
    return false;
  }

  testPasswordAgain(password1: string, password2: string){
    if(this.validation.PasswordTestAgain(password1, password2))
    {
      this.errInputPassword2 = '';
      return true;
    }
    this.errInputPassword2 = '*Lozinka nije odgovarajuća';
    return false;
  }

  testCity(){
    if(this.cities.includes(this.newProsumer.city)){
      this.errInputCity = "";
      return true;
    }
    this.errInputCity = "*Odaberite grad";
    return false;
  }

  submit(){
    
    let check1 = this.testFirstLetterAndLength(this.newProsumer.firstName,'fisrtName');
    let check2 = this.testFirstLetterAndLength(this.newProsumer.lastName,'lastName');
    let check3 = this.testEmail(this.newProsumer.email);
    let check4 = this.testCity();
    let check5 = this.testAddress(this.newProsumer.address);
    let check6 = this.testPhoneNumber(this.newProsumer.phoneNumber)
    let check7 = this.testPassword(this.newProsumer.password);
    let check8 = this.testPasswordAgain(this.pass1,this.newProsumer.password);

    if(check1 && check2 && check3 && check6 && check7 && check8 && check4 && check5 ) 
    {
      this.newProsumer.x = this.x_cor;
      this.newProsumer.y = this.y_cor;
      this.prosumerService.registerNewProsumerSolo(this.newProsumer)
      .subscribe({
        next: () => {
          // alert("Uspešna registracija.");
          this.notifyRegistered();
        },
        error: (error) => {
          if(error.error == 'Prosumer with this email already exists'){
            this.notifyProsumerAlredyExist();
          }
        }
      });
      
      
    }
  }

  notifyRegistered() {
    this.openSnackBar("Registracija uspešno izvršena", "Okej");
  }

  notifyProsumerAlredyExist() {
    this.openSnackBar("Nalog sa tom email adresom već postoji", "Okej");
  }
  openSnackBar(message: string, panelClass: string) {
    this.snackBar.openFromComponent(SnackBarComponent, {
      data: message,
      panelClass: panelClass,
      duration: 2500
    });
  }

  togglePasswordFieldType(){
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }

  togglePasswordFieldTypeTest(){
    this.passwordFieldTypeTest = this.passwordFieldTypeTest === 'password' ? 'text' : 'password';
  }

}
