import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../_services/auth.service';

/**/
import {Router} from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: any = {
    name : null,
    surname : null,
    username: null,
    email: null,
    password: null,
    confirmPassword: null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) { }
  
  ngOnInit(): void {
  }
  
  onSubmit(): void {
    const {name, surname, username, email, password, confirmPassword } = this.form;
    this.authService.register(name, surname, username, email, password, confirmPassword).subscribe({
      next: data => {
        //console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;

        this.router.navigate(['']);

      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    });
  }
}