import { DonationType } from "./DonationType";
import { Donator } from "./Donator";

//shopping cart model intended to be used in the checkout process.
export interface ShoppingCart{
    
    Quantity: number,

    price: number,

    total: number,

    itemDescription?:DonationType,

    donor?: Donator, 
}