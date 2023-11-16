import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {

  login = new FormGroup({
    email: new FormControl(),
    password: new FormControl(),
  });
  constructor(
    private auth:AuthenticationService, 
    private router:Router
  ) {}

  onSubmit() {
    //on submit we want to send the user to their appropriate route
    console.log(this.login.value);
    
    this.auth.postLogin(this.login.value).subscribe({
      next:(data:any) => {
        localStorage.setItem("role",data.roles.role_name)
        this.auth.getCredentials(this.login.value).subscribe({
          next: (data:any) =>{
            localStorage.setItem("accessToken", data["accessToken"])
            if(this.auth.isAdmin()){
              this.router.navigate(['/admin']);
            }
            else{
              this.router.navigate(['/user']);
            }
          }
        });
      },
    });
    
  }
  onCancel() {
    //return to previous page
  }
}
