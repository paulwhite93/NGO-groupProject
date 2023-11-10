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

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    UserSidebarComponent,
    MakeDonationComponent,
    DonorComponent,
    CheckoutComponent,
    TypeselectionComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
