import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DonationType } from 'src/app/Model/DonationType';
import { DonationService } from 'src/app/services/donation.service';

@Component({
  selector: 'app-add-donation',
  templateUrl: './add-donation.component.html',
  styleUrls: ['./add-donation.component.css'],
})
export class AddDonationComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'id',
    'donation_type',
    'donation_recurring'
  ];
  dataSource: MatTableDataSource<DonationType>;
  expandedDonation: DonationType | null = null;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(private dialog: MatDialog, private donationService: DonationService) {
    this.dataSource = new MatTableDataSource<DonationType>();
  }

  ngOnInit() {
    this.donationService.retrieveDonationTypes().subscribe({
      next: (data: DonationType[]) => {
        console.log("Printing Donation Types: ", data);
        this.dataSource.data = data;
      },
      error: () => {
        console.error("Error retrieving Donation Types");
      }
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editDonation(donation: DonationType) {
    this.expandedDonation = this.expandedDonation === donation ? null : donation;
    // Implement the logic for editing a donation
    console.log('Editing donation:', donation);
  }

  deleteDonation(donation: DonationType) {
    // Implement the logic for deleting the donation
    console.log('Deleting donation:', donation);
  }
}
