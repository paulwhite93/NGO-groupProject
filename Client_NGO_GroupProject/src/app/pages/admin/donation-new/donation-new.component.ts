import { Component, ElementRef, HostListener } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { DonationService } from 'src/app/services/donation.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-donation-new',
  templateUrl: './donation-new.component.html',
  styleUrls: ['./donation-new.component.css'],
})
export class DonationNewComponent {
  constructor(
    public dataService: DonationService,
    private router: Router,
    private el: ElementRef
  ) {}

  closeModal() {
    this.router.navigate(['/admin/add-donation']);
  }

  onSubmit(f: NgForm) {
    console.log(f.value);

    //Donation type Json needed because of the response from server
    this.dataService
      .addDonationTypeJson(f.value, { responseType: 'text' })
      .subscribe((data) => {
        console.log(data); // "Donor Type added"          
        if(data.status == 403){
            alert("User Session has expried Please Login again");
            this.router.navigate(['/login']);
          }
        this.router
          .navigateByUrl('/', { skipLocationChange: true })
          .then(() => {
            this.router.navigate(['/admin/add-donation']);
          });

      });
  }
}
