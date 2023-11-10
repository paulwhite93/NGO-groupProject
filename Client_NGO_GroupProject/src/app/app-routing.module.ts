import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { DonorComponent } from './pages/donation/donor/donor.component';
import { AddDonationComponent } from './pages/admin/add-donation/add-donation.component';
import { ViewDonationsComponent } from './pages/admin/view-donations/view-donations.component';
import { ViewUsersComponent } from './pages/admin/view-users/view-users.component';
import { AdminWelcomeComponent } from './pages/admin/admin-welcome/admin-welcome.component';
import { UserWelcomeComponent } from './pages/user/user-welcome/user-welcome.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full'
  },
  {
    path: 'donor',
    component: DonorComponent,
    pathMatch: 'full'
  },
  //ADMIN ROUTING
  {
    path: 'admin',
    component: AdminWelcomeComponent,
    children: [
      { path: '', component: AdminWelcomeComponent },
      { path: 'add-donation', component: AddDonationComponent },
      { path: 'view-donations', component: ViewDonationsComponent },
      { path: 'view-users', component: ViewUsersComponent },
    ],
  },
  // USER ROUTING
  {
    path: 'user',
    component: UserWelcomeComponent,
    children: [
      { path: '', component: UserWelcomeComponent },
      { path: 'donate', component: DonorComponent },
      // { path: 'view-donations', component: ViewDonationsComponent },
      // { path: 'view-users', component: ViewUsersComponent },
    ],
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
