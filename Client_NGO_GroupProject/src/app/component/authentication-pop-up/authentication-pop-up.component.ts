import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-authentication-pop-up',
  templateUrl: './authentication-pop-up.component.html',
  styleUrls: ['./authentication-pop-up.component.css']
})
export class AuthenticationPopUpComponent {
  message!: string;
  constructor(private authenticationService:AuthenticationService){}
  
  confirm():void{
    this.message = 'Log In';
    this.authenticationService.logOut();
  }

}
