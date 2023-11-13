import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

//Using Filler Data for now
export interface DonationData {
  id: string;
  donation_user: string;
  donation_type: string;
  donation_date: Date;
  donation_amount: number;
}

/** Constants used to fill up our data base. */
const CHARITIES: string[] = [
  'American Red Cross',
  'UNICEF',
  'World Health Organization',
  'Save the Children',
  'Doctors Without Borders',
  'Oxfam',
  'Habitat for Humanity',
  'Feeding America',
];
const NAMES: string[] = [
  'Maia',
  'Asher',
  'Olivia',
  'Atticus',
  'Amelia',
  'Jack',
  'Charlotte',
  'Theodore',
  'Isla',
  'Oliver',
  'Isabella',
  'Jasper',
  'Cora',
  'Levi',
  'Violet',
  'Arthur',
  'Mia',
  'Thomas',
  'Elizabeth',
];
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
  

  constructor() {
    // Create 100 users
    const users = Array.from({length: 100}, (_, k) => createNewUser(k + 1));

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(users);
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
}

/** Builds and returns a new User. */
function createNewUser(id: number): DonationData {
  const name =
    NAMES[Math.round(Math.random() * (NAMES.length - 1))] +
    ' ' +
    NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) +
    '.';

    const startDate = new Date();
    startDate.setFullYear(startDate.getFullYear() - 1);
    const endDate = new Date();
    const randomDate = new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()));

  return {
    id: id.toString(),
    donation_user: name,
    donation_type: CHARITIES[Math.round(Math.random() * (CHARITIES.length - 1))],
    donation_date: randomDate,
    donation_amount: Math.random() * 1000,
  };
}
