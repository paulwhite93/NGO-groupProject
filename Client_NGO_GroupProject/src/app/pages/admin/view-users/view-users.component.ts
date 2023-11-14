import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogData, ConfirmationDialogComponent } from 'src/app/component/confirmation-dialog/confirmation-dialog.component';
export interface DonationData {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
}

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
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css']
})
export class ViewUsersComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'first_name', 'last_name', 'email', 'role', 'edit', 'delete'];
  dataSource: MatTableDataSource<DonationData>;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  

  constructor(private dialog: MatDialog) {
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
  // Add these methods to your component
editUser(user: any) {
  // Implement the logic for editing a user
  console.log('Editing user:', user);
}

deleteUser(user: any) {
  const confirmationData: ConfirmationDialogData = {
    title: 'Confirm Delete',
    message: "Are you sure you want to delete this user? "+ 
    "<br><b>name: </b>" + user.first_name + " " + user.last_name + 
    "<br><b>email: </b> " + user.email +
    "<br><b>role: </b>" + user.role,
  };

  console.log(user);
  
  const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
    data: confirmationData,
  });

  dialogRef.afterClosed().subscribe((result: any) => {
    if (result) {
      // Implement the logic for deleting the user
      console.log('Deleting user:', user);
    }
  });
}

}

/** Builds and returns a new User. */
function createNewUser(id: number): DonationData {
  const firstname = NAMES[Math.round(Math.random() * (NAMES.length - 1))];
  const lastname = NAMES[Math.round(Math.random() * (NAMES.length - 1))];
  const name = firstname+lastname;
  return {
    id: id.toString(),
    first_name: firstname,
    last_name: lastname,
    email: name+"@gmail.com",
    role: Math.random() * 1000 > 500 ? "Admin" : "User",
  };
}



