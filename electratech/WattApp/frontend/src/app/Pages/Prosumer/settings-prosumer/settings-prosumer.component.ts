import { Component,Input } from '@angular/core';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { updateDataProsumer } from 'src/app/Models/updateProsumer'; 
import { ValidationService } from 'src/app/Services/LoginValidation/validation.service'; 
import { ProsumerService } from 'src/app/Services/API/Prosumer-API/ProsumerSoloRegisterUpdate/prosumer.service';
import { faSignOut } from '@fortawesome/free-solid-svg-icons';
import { LoginService } from 'src/app/Services/API/Security/Login/login.service';
import { GetProsumerForSettingsPage, SettingsProsumerService, UpdateProsumer } from 'src/app/Services/API/Prosumer-API/ProsumerSettings/settings-prosumer.service';
import { SnackBarComponent } from 'src/app/Component/snack-bar/snack-bar.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ImageBase64Service } from 'src/app/Services/ImageBase64/image-base64.service';
import { prosumerPageInformation } from 'src/app/Models/prosumerTableInfo';

@Component({
  selector: 'app-settings-prosumer',
  templateUrl: './settings-prosumer.component.html',
  styleUrls: ['./settings-prosumer.component.css']
})
export class SettingsProsumerComponent {
  faUser=faUser;
  faSignOut=faSignOut;

  errInputName = '' as string;
  errInputSurname = '' as string;
  errInputCity = '' as string;
  errInputAddress = '' as string;
  errInputEmail = '' as string;
  errInputPassword1 = '' as string;
  errInputPassword2 = '' as string;
  errInputNumber = '' as string;
  errImage = '' as string;

  prosumerInfo = {} as GetProsumerForSettingsPage;
  prosumer = {} as UpdateProsumer;

  passwordChange =  false;
  toggleLabels = {checked: 'Da', unchecked: 'Ne'};
  toggleColor ={checked: '#6E9C0C', unchecked: 'silver'};

  profilePictue:any;

  constructor( private login:LoginService , private _validation: ValidationService, private prosumerService: ProsumerService, private settingsService: SettingsProsumerService, private snackBar: MatSnackBar, private image:ImageBase64Service)
  {
    this.settingsService.getProsumerForSettingsPage().subscribe(
      response => {
        this.prosumerInfo = response;
        this.profilePictue = this.image.getPicture(response.image);
      }
    );
  }

  logout(){
    this.login.logout();
  }

  pass1: string = '';
  pass2: string = '';

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

  testPassword(password: string){
    if(password == '')
    {
      this.errInputPassword1 = '';
      return true;
    }
      
    if(this.validation.PasswordTest(password))
    {
      this.errInputPassword1 = '';
      return true;
    }
    this.errInputPassword1 = '*Mora sadržati broj, velika i mala slova';
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

  testPhoneNumber(number:string){
    if(this.validation.PhoneNumberTest(number))
    {
      this.errInputNumber='';
      return true;
    }
    this.errInputNumber = '*Broj telefona nema odgovarajući broj cifara';
    return false;
  }
  person!:prosumerPageInformation;
  updateDataProsumer(){
    let check1 = this.testFirstLetterAndLength(this.prosumerInfo.firstName, 'firstName');
    let check2 = this.testFirstLetterAndLength(this.prosumerInfo.lastName, 'firstName');
    let check3 = this.testEmail(this.prosumerInfo.email);
    let check4 = this.testPhoneNumber(this.prosumerInfo.phoneNumber);
    let check5 = this.testPassword(this.pass1);
    let check6 = this.testPasswordAgain(this.pass1, this.pass2);
    
    if (check1 && check2 && check3 && check4 && check5 && check6){

      this.prosumer.firstName = this.prosumerInfo.firstName;
      this.prosumer.lastName = this.prosumerInfo.lastName;
      this.prosumer.email = this.prosumerInfo.email;
      this.prosumer.phoneNumber = this.prosumerInfo.phoneNumber;
      if(this.passwordChange == true && this.pass1 != '')
        this.prosumer.password = this.pass1;

      this.settingsService.updateProsumer(this.prosumer)
      .subscribe({
        next: () => {
          this.getNotification();
        },
        error: (error) => {
        }
      });
      
      if(this.newImage != null){
        this.settingsService.changeImage(this.newImage).subscribe(
          response=>{
          },
          error=>{},
          ()=>{}
        )
        var prosumer = sessionStorage.getItem('prosumerInfo');
        if(prosumer != null){
          this.person = JSON.parse(prosumer);
          this.person.image = this.newImage;
          sessionStorage.setItem('prosumerInfo',JSON.stringify(this.person));
        } 
      }
    }
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

  getNotification() {
    this.openSnackBar("Uspešno ste pormenili podatke", "Okej");
  }

  openSnackBar(message: string, panelClass: string) {
    this.snackBar.openFromComponent(SnackBarComponent, {
      data: message,
      panelClass: panelClass,
      duration: 2500
    });
  }

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
  newImage!:string;
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
