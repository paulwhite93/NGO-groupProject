import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-donor',
  templateUrl: './donor.component.html',
  styleUrls: ['./donor.component.css']
})
export class DonorComponent {

  donorForm = new FormGroup({
    firstName: new FormControl(),
    lastName: new FormControl(),
    cma: new FormControl(),
    phone: new FormControl(),
    email: new FormControl(),
    address1: new FormControl(),
    address2: new FormControl(),
    city: new FormControl(),
    zip: new FormControl(),
    state: new FormControl(),
    country: new FormControl(),
    urbanization: new FormControl(),
  });

  onSubmit(){
    //on submit we want to send the donor form to the server 
    //and send to shopping cart and redirect to cart
    console.log(this.donorForm.value);
  }
  onCancel(){
    //return to previous page
  }
}
