import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.css']
})
export class AdminSidebarComponent {
  constructor(public login: AuthenticationService) {}
  public logout() {
    this.login.logout();
    window.location.reload();
  }
}
