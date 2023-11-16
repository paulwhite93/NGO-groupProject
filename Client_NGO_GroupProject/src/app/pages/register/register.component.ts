import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user = new FormGroup({
    name: new FormControl(),
    userName: new FormControl(),
    password: new FormControl(),
  });
  constructor(
    private userService: UserService, 
    private router:Router
  ) {}
  onSubmit() {
    //on submit we want to send the user to their appropriate route
    console.log(this.user.value);
    
    
  }
  onCancel() {
    //return to previous page
  }
}