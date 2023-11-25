import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationPopUpComponent } from '../component/authentication-pop-up/authentication-pop-up.component';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationPopUpService {

  constructor(private dialog: MatDialog) { }

    openPopUp(){
      this.dialog.open(AuthenticationPopUpComponent);
    }
}
