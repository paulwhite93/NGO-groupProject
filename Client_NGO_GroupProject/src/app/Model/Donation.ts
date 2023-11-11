import { DonationType } from "./DonationType";
import { Donator } from "./Donator";

export interface Donation{

    donor:Donator,

    date:Date,

    amount:number,

    donationType:DonationType,
    
    reoccuringDonation:boolean,
}