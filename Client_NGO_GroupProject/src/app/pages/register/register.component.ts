import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/Model/User';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user = new FormGroup({
    first_name: new FormControl(),
    last_name: new FormControl(),
    password: new FormControl(),
    email: new FormControl(),
  });
  constructor(
    private userService: UserService, 
    private router:Router
  ) {}
  onSubmit() {
    //on submit we want to send the user to their appropriate route
    console.log(this.user.value);
    this.userService.addUser({
      firstname:this.user.get(['first_name'])?.value,
      lastname:this.user.get(['last_name'])?.value,
      email:this.user.get(['email'])?.value,
      password:this.user.get(['password'])?.value,
      roles:{
          id:2,
          role_name:"user"
      }
    }).subscribe((data:any)=>{
      this.router.navigate(['/login']);
    })
  }
  onCancel() {
    //return to previous page
  }
}