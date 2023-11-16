import { Component, ElementRef, HostListener } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { DonationService } from 'src/app/services/donation.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-donation-new',
  templateUrl: './donation-new.component.html',
  styleUrls: ['./donation-new.component.css']
})
export class DonationNewComponent {
  constructor(public dataService:DonationService, private router:Router, private el: ElementRef){}
  
  closeModal() {
    this.router.navigate(["/admin/add-donation"]);
  }

  onSubmit(f:NgForm){
    //False wouldn't be set otherwise
    if (!f.value.donation_enabled) {
      f.value.donation_enabled = false;
    }
    if (!f.value.donation_recurring) {
      f.value.donation_recurring = false;
    }
    console.log(f.value)
    f.value['id'] = this.dataService.retrieveDonationTypes().findIndex;
    // this.dataService.employees.insert(f.value);
    this.router.navigate(["/admin/add-donation"]);
  }
}
