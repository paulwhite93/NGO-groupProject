import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmationDialogData, ConfirmationDialogComponent } from 'src/app/component/confirmation-dialog/confirmation-dialog.component';

export interface DonationData {
  id: string;
  donation_type: string;
  donation_enabled: boolean;
  donation_recurring: boolean;
}

const NAMES: DonationData[] = [
  {
    id: '1',
    donation_type: 'American Red Cross',
    donation_enabled: true,
    donation_recurring: false,
  },
  {
    id: '2',
    donation_type: 'UNICEF',
    donation_enabled: false,
    donation_recurring: true,
  },
  {
    id: '3',
    donation_type: 'Doctors Without Borders',
    donation_enabled: true,
    donation_recurring: true,
  },
  {
    id: '4',
    donation_type: 'Habitat for Humanity',
    donation_enabled: true,
    donation_recurring: true,
  },
];

@Component({
  selector: 'app-add-donation',
  templateUrl: './add-donation.component.html',
  styleUrls: ['./add-donation.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class AddDonationComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'id',
    'donation_type',
    'donation_enabled',
    'donation_recurring',
    'edit',
    'delete',
  ];
  dataSource: MatTableDataSource<DonationData>;
  expandedDonation: DonationData | null = null;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(private dialog: MatDialog) {
    // Use the provided NAMES data
    this.dataSource = new MatTableDataSource(NAMES);
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

  editUser(user: DonationData) {
    this.expandedDonation = this.expandedDonation === user ? null : user;
    // Implement the logic for editing a user
    console.log('Editing user:', user);
  }

  
  enabled = false;
  recurring = false;
  expandRow(row: DonationData) {
    console.log('expandRow called for row:', row);
    this.enabled = row.donation_enabled;
    this.recurring = row.donation_recurring;
    this.expandedDonation = this.expandedDonation === row ? null : row;
  }

  deleteDonation(donation: any) {
    //Information to pass to the Confirmation Dialog
    const confirmationData: ConfirmationDialogData = {
      title: 'Confirm Delete',
      message:
        'Are you sure you want to delete this donation event? ' +
        '<br><b>Name: </b>' +
        donation.donation_type +
        '<br><b>Enabled: </b> ' +
        donation.donation_enabled +
        '<br><b>Recurring: </b>' +
        donation.donation_recurring,
    };

    //Log to make sure user object is indeed what we think it is
    console.log(donation);

    //
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: confirmationData,
    });

    //Awaits result from the pop-up dialog box
    dialogRef.afterClosed().subscribe((result: any) => {
      //If the user selected yes:
      if (result) {
        // Implement the logic for deleting the donation
        console.log('Deleting donation event:', donation);
      }
      //If user clicks out or presses cancel
      else{
      console.log("cancelled");
      }
      
    });
  }
}
