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
import { UserRole } from 'src/app/Model/UserRole';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

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
    'firstname',
    'lastname',
    'email',
    'role',
    'edit',
    'delete',
  ];

  dataSource: MatTableDataSource<User>;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private userService: UserService,
    private fb: FormBuilder
  ) {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource<User>();
  }

  editUserForm = new FormGroup({
    id: new FormControl(),
    firstname: new FormControl(),
    lastname: new FormControl(),
    email: new FormControl(),
    roles: new FormGroup({
      id: new FormControl(),
      role_name: new FormControl(),
    }),
  });

  ngOnInit() {
    this.userService.getUsers().subscribe({
      next: (data: User[]) => {
        console.log('Printing Users: ', data);
        this.dataSource.data = data;
      },
      error: () => {
        console.error('Error retrieving Users');
      },
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

  editUser() {
    const baseUser = this.expandedUser;
    const editUser = this.editUserForm.value;

    //always set the edit to the same id
    editUser.id = baseUser?.id;

    if (editUser.firstname == null || editUser.firstname == undefined)
      editUser.firstname = baseUser?.firstname;
    if (editUser.lastname == null || editUser.lastname == undefined)
      editUser.lastname = baseUser?.lastname;
    if (editUser.email == null || editUser.email == undefined)
      editUser.email = baseUser?.email;
    

    console.log(editUser);

    // // Implement the logic for editing a user
    console.log('Base user:', baseUser);
    // console.log(editedUser);
    // editedUser.id = baseUser?.id;
    // console.log('Edited user:' + editedUser);
    let id = editUser.roles?.id;
    let name = editUser.roles?.role_name;
    this.userService.updateUser({
      id:editUser.id,
      firstname:editUser.firstname,
      lastname:editUser.lastname,
      email:editUser.email,
      roles:{
        id:id,
        role_name:name
      }
    }).subscribe({
      error:(error) => {
        if(error.status == 200){
          //user edited successfully
          ///Modify your datascource table here
          console.log('User edited successfully:', error);
          this.router.navigateByUrl('/',{skipLocationChange:true}).then(()=>{this.router.navigate(['/admin/view-users'])})
        }
        else{
          console.error('Error editing user:', error);
        }
      }
    });
  }

  modifyUser(user:any){
    //update user in table of the same id as the one in EditUserForm
    for(let i = 0; i < this.dataSource.data.length; i++){
      let id:any = this.dataSource.data[i].id;
      console.log(this.dataSource.data[i].id," ",user.id);
      if (id == user.id){   
      console.log("updating user: "+this.dataSource.data[i]) 
        this.dataSource.data[i] = user;
      }
    }
  }

  expandRow(row: User) {
    // console.log('expandRow called for row:', row);
    this.expandedUser = this.expandedUser === row ? null : row;
  }

  deleteUser(user: any) {
    const confirmationData: ConfirmationDialogData = {
      title: 'Confirm Delete',
      message:
        'Are you sure you want to delete this user? ' +
        '<br><b>name: </b>' +
        user.firstname +
        ' ' +
        user.lastname +
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

        this.userService
          .deleteUserJson(user.id, { responseType: 'text' })
          .subscribe(
            (response) => {
              console.log('User deleted successfully:', response);
              this.dataSource.data = this.dataSource.data.filter(
                (u) => u.id !== user.id
              );
            },
            (error) => {
              console.error('Error deleting user:', error);
            }
          );
      }
    });
  }
}
