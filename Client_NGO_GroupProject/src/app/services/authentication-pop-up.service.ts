import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationPopUpComponent } from '../component/authentication-pop-up/authentication-pop-up.component';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationPopUpService implements HttpInterceptor{

  constructor(private dialog: MatDialog) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      return next.handle(request).pipe(catchError(err => {
        console.log(request);
          if ([401, 403].includes(err.status)) {
                // auto logout if 401 or 403 response returned from api
            this.openPopUp();
          }
      const error = err.error?.message || err.statusText;
      console.error(err);
      return throwError(() => error);
      }))
    }

    openPopUp(){
      this.dialog.open(AuthenticationPopUpComponent);
    }
}
