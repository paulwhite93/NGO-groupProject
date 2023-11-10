import { Donation } from "./Donation";
import { DonationType } from "./DonationType";
import { Donator } from "./Donator";

//shopping cart model intended to be used in the checkout process.
export interface ShoppingCart{
    
    Quantity: number,

    price: Donation["amount"],

    total: number,

    itemDescription?: Donation["donationType"],

    donor?: Donation["donor"], 
}