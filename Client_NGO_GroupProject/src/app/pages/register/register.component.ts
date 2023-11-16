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
    name: new FormControl(),
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
    console.log({
      name:this.user.get(['name']),
      email:this.user.get(['email']),
      password:this.user.get(['password']),
      roles:{
          id:2,
          role_name:"user"
      }
    })
    this.userService.addUser({
      name:this.user.get(['name']),
      email:this.user.get(['email']),
      password:this.user.get(['password']),
      roles:{
          id:2,
          role_name:"user"
      }
    }).subscribe({
      next:()=>{
        this.router.navigate(['/login']);
      },
      error:()=>{

      }
    })
  }
  onCancel() {
    //return to previous page
  }
}