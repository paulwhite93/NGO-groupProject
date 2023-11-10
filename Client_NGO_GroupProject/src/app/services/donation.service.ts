import { Injectable } from '@angular/core';

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
}
