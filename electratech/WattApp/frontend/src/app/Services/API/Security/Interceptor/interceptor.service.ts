import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const idToken = localStorage.getItem("id_token");
    if(idToken){
      const clone = req.clone({
        headers:req.headers.set('Authorization',`Bearer ${idToken}`)
      });
      // console.log("SALJEM: "+idToken);
      return next.handle(clone);
    }
    else{
      return next.handle(req);
    }
  }

}
