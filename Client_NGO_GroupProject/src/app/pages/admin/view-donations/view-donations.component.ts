import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DonationData } from '../view-users/view-users.component';
import { DonationService } from 'src/app/services/donation.service';


@Component({
  selector: 'app-view-donations',
  templateUrl: './view-donations.component.html',
  styleUrls: ['./view-donations.component.css']
})
export class ViewDonationsComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'donation_user', 'donation_date', 'donation_amount', 'donation_type'];
  dataSource: MatTableDataSource<DonationData>;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  

  constructor(private donationService: DonationService) {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource<DonationData>();
  }
  ngOnInit() {
    this.donationService.getDonations().subscribe({
      next: (data: DonationData[]) => {
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
    console.log('Filter Value:', filterValue); // Check the filterValue in the console
    this.dataSource.filter = filterValue.trim().toLowerCase();
  
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
}

