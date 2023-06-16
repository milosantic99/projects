import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class InterceptorErrorService {

  constructor(private router:Router) { }

intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse)=>{
        if (error.status === 401){
          localStorage.clear();
          sessionStorage.clear();
          // this.router.navigate(['/login']);
          window.open('/error','_self');
        }
        return throwError(error);
      })
    )
  }

}
