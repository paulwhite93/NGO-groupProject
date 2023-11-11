import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from 'src/material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { UserSidebarComponent } from './pages/user/user-sidebar/user-sidebar.component';
import { MakeDonationComponent } from './pages/donation/make-donation/make-donation.component';
import { DonorComponent } from './pages/donation/donor/donor.component';
import { CheckoutComponent } from './pages/donation/checkout/checkout.component';
import { TypeselectionComponent } from './pages/donation/type-selection/type-selection.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ViewUsersComponent } from './pages/admin/view-users/view-users.component';
import { ViewDonationsComponent } from './pages/admin/view-donations/view-donations.component';
import { AddDonationComponent } from './pages/admin/add-donation/add-donation.component';
import { AdminWelcomeComponent } from './pages/admin/admin-welcome/admin-welcome.component';
import { UserWelcomeComponent } from './pages/user/user-welcome/user-welcome.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    UserSidebarComponent,
    MakeDonationComponent,
    DonorComponent,
    CheckoutComponent,
    TypeselectionComponent,
    HomeComponent,
    LoginComponent,
    ViewUsersComponent,
    ViewDonationsComponent,
    AddDonationComponent,
    AdminWelcomeComponent,
    UserWelcomeComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatTooltipModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
