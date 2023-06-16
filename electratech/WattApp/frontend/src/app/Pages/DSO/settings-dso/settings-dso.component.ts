import { Component } from '@angular/core';
import { ValidationService } from 'src/app/Services/LoginValidation/validation.service'; 
import { faBuilding, faL, faTrash } from '@fortawesome/free-solid-svg-icons';
import { DsoUsersService } from 'src/app/Services/API/DSO-API/DSO/dso-users.service';
import { updateDso } from 'src/app/Models/updateDso';
import { DSOInformation } from 'src/app/Models/registerDSO';
import { DsoSettingsService } from 'src/app/Services/API/DSO-API/DsoSettings/dso-settings.service';
import { SnackBarComponent } from 'src/app/Component/snack-bar/snack-bar.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ImageBase64Service } from 'src/app/Services/ImageBase64/image-base64.service';
import { response } from 'express';
import { LoginService } from 'src/app/Services/API/Security/Login/login.service';

@Component({
  selector: 'app-settings-dso',
  templateUrl: './settings-dso.component.html',
  styleUrls: ['./settings-dso.component.css']
})
export class SettingsDsoComponent {

  toggleLabels = {checked: 'Da', unchecked: 'Ne'};
  toggleColor ={checked: '#6E9C0C', unchecked: 'silver'};

  passwordChange = false;

  faBuilding=faBuilding;
  faTrash=faTrash;

  dsoInformation={} as DSOInformation;

  profilePictue:any;
  role:string;
  constructor(private _validation: ValidationService , private dsoService:DsoUsersService, private dsoServiceSettings: DsoSettingsService, private snackBar: MatSnackBar, private image: ImageBase64Service, private login:LoginService) {
    this.dsoService.getInformationForSettingsByDso().subscribe(
      response=>{
        this.dsoInformation = response;
        this.profilePictue = this.image.getPicture(this.dsoInformation.image);
      }
    );
    this.role = this.login.getRole(); 
  }

  setPasswordChange(){
    switch(this.passwordChange){
      case true:
        this.passwordChange = false;
        break;
      case false:
        this.passwordChange = true;
        break;
    }
  }

  errInputName = '' as string;
  errInputSurname = '' as string;
  errInputNameCompany = '' as string;
  errInputEmail = '' as string;
  errPhoneNumber = '' as string;
  errInputCity = '' as string;
  errInputAddress = '' as string;
  errInputPassword = '' as string;
  errInputPassword2 = '' as string;
  errImage = '' as string;
  get validation(){
    return this._validation;
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
          case "nameCompany":
            this.errInputNameCompany = '';
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
          case "companyName":
          this.errInputNameCompany = '*Mora početi velikim slovom';
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
    return true;
    // if(this.validation.AddressTest(address)){
    //   this.errInputAddress = '';
    //   return true;
    // }
    // this.errInputAddress = '*Adresa mora biti precizna i tačna';
    // return false;
  }

  testPhoneNumber(number:string){
    if(this.validation.PhoneNumberTest(number))
    {
      this.errPhoneNumber='';
      return true;
    }
    this.errPhoneNumber = '*Broj telefona nema odgovarajući broj cifara';
    return false;
  }

  testPassword(password: string){
    if(this.validation.PasswordTest(password))
    {
      this.errInputPassword = '';
      return true;
    }
    if(this.passwordChange==true)
      this.errInputPassword = '*Mora sadržati broj, velika i mala slova';
    return false;
  }

  testPasswordAgain(password1: string, password2: string){
    if(this.validation.PasswordTestAgain(password1, password2))
    {
      this.errInputPassword2 = '';
      return true;
    }
    if(this.passwordChange==true)
      this.errInputPassword2 = '*Lozinka nije odgovarajuća';
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

  updateDso(password1:string,password2:string){
    let check1 = this.testFirstLetterAndLength(this.dsoInformation.ownerFirstName, 'firstName');
    let check2 = this.testFirstLetterAndLength(this.dsoInformation.ownerLastName, 'lastName');
    let check3 = this.testEmail(this.dsoInformation.email);
    let check4 = this.testAddress(this.dsoInformation.address);
    let check5 = true;
    let check6 = true;
    let check7 = true;
    if(this.passwordChange){
      check5 = this.testPassword(password1);
      check6 = this.testPassword(password2);
      check7 = this.testPasswordAgain(password1,password2);
    }
    let check8 = this.testFirstLetterAndLength(this.dsoInformation.companyName, 'companyName');
  
    if (check1 && check2 && check3 && check4 && check5 && check6 && check7 && check8){      
      // console.log(this.dsoInformation);
      if(this.newImage != null)
      {
        if(this.passwordChange == false)
        {
          this.dsoServiceSettings.updateDso(this.dsoInformation.companyName, this.dsoInformation.email, this.dsoInformation.ownerFirstName, this.dsoInformation.ownerLastName, this.dsoInformation.address).subscribe(
            response => this.openSnackBar("Uspešna promena podataka", "class"),
            error => this.openSnackBar("Uspešna promena podataka", "class"),
          )
        }
        else {
          this.dsoInformation.password = password2;
          this.dsoServiceSettings.editPassword(this.dsoInformation.password, this.dsoInformation.email).subscribe(
            response => {},
            error => {},
          )
          this.dsoServiceSettings.updateDso(this.dsoInformation.companyName, this.dsoInformation.email, this.dsoInformation.ownerFirstName, this.dsoInformation.ownerLastName, this.dsoInformation.address).subscribe(
            response => {},
            error => {},
          )
          this.openSnackBar("Uspešna promena podataka", "class");
        }
        this.dsoServiceSettings.changeImage(this.newImage).subscribe(
          response=> {},
          error=>{},
        );
        window.open("/SettingsDso","_self");
      }
      else {
        if(this.passwordChange == false)
        {
          this.dsoServiceSettings.updateDso(this.dsoInformation.companyName, this.dsoInformation.email, this.dsoInformation.ownerFirstName, this.dsoInformation.ownerLastName, this.dsoInformation.address).subscribe(
            response => this.openSnackBar("Uspešna promena podataka", "class"),
            error => this.openSnackBar("Uspešna promena podataka", "class"),
          )
        }
        else {
          this.dsoInformation.password = password2;
          this.dsoServiceSettings.editPassword(this.dsoInformation.password, this.dsoInformation.email).subscribe(
            response => {},
            error => {},
          )
          this.dsoServiceSettings.updateDso(this.dsoInformation.companyName, this.dsoInformation.email, this.dsoInformation.ownerFirstName, this.dsoInformation.ownerLastName, this.dsoInformation.address).subscribe(
            response => {},
            error => {},
          )

          this.openSnackBar("Uspešna promena podataka", "class");
        }
      }
    }

  }
  newImage!:string;
  onFileSelected(event:any) {
    const file = event.target.files[0];
    var size = file.size;
    size = size / (1024*1024);
    if(size > 1)
      this.errImage = 'Velicina slike mora biti do 1 MB-a';
    else
    {
      this.errImage = '';
      this.convertToBase64(file);
    }
  }

  convertToBase64(file:any) {
    const reader = new FileReader();
    var base64String: string | null = null;
    reader.readAsDataURL(file);
    reader.onload = () => {
      if(reader.result != null)
      {
        base64String = reader.result.toString().split(',')[1];
        this.profilePictue = this.image.getPicture(base64String); 
        this.newImage = base64String; 
      }
    };
  }

  

}
