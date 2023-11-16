import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public getUsers() {
    /*
      id: number,

  name: string,

  password: string,

  email: string,

  user_role: UserRole,
  */
    return [
      {
        id: 1,
        name: 'George Doe',
        email: 'georgedoe@gmail.com',
        // Will probably have to do something here for nested object User_Role
        user_role: 'admin',
      },
      {
        id: 2,
        name: 'John Smith',
        email: 'johnsmith@gmail.com',
        // Will probably have to do something here for nested object User_Role
        user_role: 'user',
      },
      {
        id: 3,
        name: 'Jane Lane',
        email: 'janelane@gmail.com',
        // Will probably have to do something here for nested object User_Role
        user_role: 'user',
      },
    ];
  }
}
