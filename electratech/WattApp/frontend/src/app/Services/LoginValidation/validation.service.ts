import { Injectable } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor() { }

  FirstLetterAndLengthTest(input:string)
  {
    var control1 = new FormControl(input.length,Validators.min(2));
    var contorl2 = new FormControl(input,Validators.pattern('^[A-Z].*'));

    if(control1.errors == null && contorl2.errors == null) return true;
      return false;
  }
  
  EmailTest(input:string)
  {
    var control = new FormControl(input,Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$"));
    if(control.errors == null && input.length>0) return true;
    return false;
  }

  AddressTest(input:string)
  {
    var control = new FormControl(input,Validators.pattern("^(?=.*[A-ZČčĆćŽžŠšĐđ])(?=.*[a-zČčĆćŽžŠšĐđ])(?=.*\\d)[A-Za-z0-9\d/ ČčĆćŽžŠšĐđ, ]{5,}$"));
    if(control.errors == null && input.length>0) return true;
    return false;
  }

  PhoneNumberTest(input:string){
    var control = new FormControl(input,Validators.pattern("^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{3,6}$"));
    if (control.errors == null && input.length > 0) return true;
    return false;
  }

  PasswordRegexTest(input:string)
  {
    var control = new FormControl(input,Validators.pattern("^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)[A-Za-z\\d!$%@#£€*?&]{8,}$"));
    return control;
  }

  PasswordTest(input:string)
  {
    var control = this.PasswordRegexTest(input);
    if(control.errors == null && input.length>0) return true;
    return false;
  }

  PasswordTestAgain(input1:string,input2:string)
  {
    if(input1 === input2) return true;
    return false;
  }
}
