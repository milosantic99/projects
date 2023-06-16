import { Component, Input } from '@angular/core';
import { registerDSO } from 'src/app/Models/registerDSO';
import { RegisterService } from 'src/app/Services/API/DSO-API/RegisterNewDso/register.service';
import { ValidationService } from 'src/app/Services/LoginValidation/validation.service'; 



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {
  @Input() dso : registerDSO;

  errInputName = '' as string;
  errInputSurname = '' as string;
  errInputEmail = '' as string;
  errInputCompanyName = '' as string;
  errInputAddress = '' as string;
  errInputPassword1 = '' as string;
  errInputPassword2 = '' as string;
  constructor(private registerService : RegisterService, private _validation: ValidationService)
  {
    this.dso = {} as registerDSO;
  }

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
          case "companyName":
            this.errInputCompanyName = '';
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
          case "companyName":
            this.errInputCompanyName = '*Mora početi velikim slovom';
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

  submit(input_name:string,input_surname:string,input_email:string,input_company_name:string,input_address:string,input_pass1:string,input_pass2:string){
    
    var control1 = this.testFirstLetterAndLength(input_name,'name');
    var control2 = this.testFirstLetterAndLength(input_name,'surname');
    var control3 = this.testEmail(input_email);
    var control4 = this.testFirstLetterAndLength(input_company_name,'companyName');
    var control5 = this.testAddress(input_address);
    var control6 = this.testPassword(input_pass1);
    var control7 = this.testPassword(input_pass2);
    var control8 = this.testPasswordAgain(input_pass1,input_pass2);

    if(control1 && control2 && control3 && control4 && control5 && control6 && control7 && control8) 
    {
      this.dso.ownerFirstName = input_name;
      this.dso.ownerLastName = input_surname;
      this.dso.email = input_email;
      this.dso.companyName = input_company_name;
      this.dso.address = input_address;
      this.dso.password = input_pass1;
      // console.log(this.dso);

      var response = this.registerService.registerNewDso(this.dso)
      .subscribe(
        response =>{console.log(response);},
        error =>{
          console.log(error);
          var r = error.error;
          switch(r){
            case "Company name already exists.":
              this.errInputCompanyName = 'Ime kompanije vec postoji!';
              this.errInputEmail = '';
              break;
            case "Dso with this email already exists.":
              this.errInputEmail = "Korisnik je vec registrovan";
              this.errInputCompanyName = '';
              break;
          }
        }
      );

    }
  }

}
