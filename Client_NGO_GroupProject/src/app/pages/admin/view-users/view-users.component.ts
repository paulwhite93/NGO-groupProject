import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import {
  ConfirmationDialogData,
  ConfirmationDialogComponent,
} from 'src/app/component/confirmation-dialog/confirmation-dialog.component';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { User } from 'src/app/Model/User';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css'],
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
export class ViewUsersComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'id',
    'first_name',
    'last_name',
    'email',
    'role',
    'edit',
    'delete',
  ];

  dataSource: MatTableDataSource<User>;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(private router:Router, private dialog: MatDialog, private userService: UserService) {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource<User>();
    // expandedUser: DonationData | null = null;
  }

  ngOnInit() {
    this.userService.getUsers().subscribe({
      next: (data: User[]) => {
        console.log("Printing Users: ", data);
        this.dataSource.data = data;
      },
      error: () => {
        console.error("Error retrieving Users");
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
  expandedUser: User | null = null;

  editUser(user: User) {
    this.expandedUser = this.expandedUser === user ? null : user;
    // Implement the logic for editing a user
    console.log('Editing user:', user);
  }
  
  expandRow(row: User) {
    console.log('expandRow called for row:', row);
    this.expandedUser = this.expandedUser === row ? null : row;
  }

  deleteUser(user: any) {
    const confirmationData: ConfirmationDialogData = {
      title: 'Confirm Delete',
      message:
        'Are you sure you want to delete this user? ' +
        '<br><b>name: </b>' +
        user.first_name +
        ' ' +
        user.last_name +
        '<br><b>email: </b> ' +
        user.email +
        '<br><b>role: </b>' +
        user.roles.role_name,
    };

    console.log(user);

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: confirmationData,
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        // Implement the logic for deleting the user
        console.log('Deleting user:', user);

        this.userService.deleteUserJson(user.id, { responseType: 'text' }).subscribe(
          (response) => {
            console.log('User deleted successfully:', response);
            this.dataSource.data = this.dataSource.data.filter(u => u.id !== user.id);
          },
          (error) => {
            console.error('Error deleting user:', error);
          }
        );
        
      }
    });
  }
}