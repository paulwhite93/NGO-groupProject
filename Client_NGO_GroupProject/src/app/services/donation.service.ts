import { Injectable } from '@angular/core';
import { Donation } from '../Model/Donation';

@Injectable({
  providedIn: 'root'
})
export class DonationService {

  public retrieveDonationTypes(){
    return [
    {
      id:1,
      type:'General Donation Fund',
      reoccurrence:true
    },
    {
      id:2,
      type:'Run for the sun 2017',
      reoccurrence:true
    },
    {
      id:3,
      type:'Mission Trip Sponsorship',
      reoccurrence:false
    },
    {
      id:4,
      type:'Memorial Gift',
      reoccurrence:true
    }]
  }
  public postDonation(donation:Donation){
    /*
    Donation Format
    {
    "amount":"4444",
    "date":"2023-11-13T21:12:31.353Z",
    "donationType":{"id":"1","type":"General Donation Fund","reoccurence":"true"},
    "donor":{"firstname":"paul","lastname":"smith","cma":"4444","phone":"444444","email":"something@gmail.com","country":"United States","state":"WA","address1":"testStreet","address2":null,"urbanization":null,"zip":"98034"},
    "reoccuringDonation":"true"
    }
    */
   //Send donation to server ->
   console.log(donation);
  }
  public sendEmail(email:string, message:string){

  }
  public cleanUpLocalStorage(){
    localStorage.removeItem('shoppingCart');
    localStorage.removeItem('donor');
  }
}
