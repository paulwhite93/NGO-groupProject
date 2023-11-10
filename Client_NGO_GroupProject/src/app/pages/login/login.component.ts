import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {

  login = new FormGroup({
    userName: new FormControl(),
    password: new FormControl(),
  });
  constructor(
    private router: Router
  ) {}

  onSubmit() {
    //on submit we want to send the user to their appropriate route
    console.log(this.login.value.userName);

    if (this.login.value.userName == 'admin') {
      this.router.navigate(['/admin']);
    }
    else if (this.login.value.userName == 'user') {
      this.router.navigate(['/user']);
    }
    
  }
  onCancel() {
    //return to previous page
  }
}
