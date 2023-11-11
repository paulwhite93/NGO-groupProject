import { Component } from '@angular/core';
import { Donation } from 'src/app/Model/Donation';
import { ShoppingCart } from 'src/app/Model/ShoppingCart';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  public shoppingCart:any;
  public displayedColumns: string[] = ['Item Description', 'Donation Amount', 'Monthly Recurring'];
  constructor(

  ){

  }
  ngOnInit(){
    let data:any = localStorage.getItem('shoppingCart');
    console.log(JSON.parse(data));
    data = JSON.parse(data);
    console.log(data);
    data.forEach((order:Donation) => {
      console.log(order);
    });
    this.shoppingCart = {
      items:data,
      total:this.getCartTotal(data),
      monthlyTotal:this.getCartMonthlyTotal(data),
    }
    console.log(this.shoppingCart);
  }
  getCartTotal(data:any):Number{
    let sum:Number = 0
    data.forEach((element:any) => {
      let amount:any = parseFloat(element.amount);
      sum = sum + amount;
    });
    return sum 
  } 
  getCartMonthlyTotal(data:any):Number{
    let sum:Number = 0
    data.forEach((element:any) => {
      if(element.reoccuringDonation){
        let amount:any = parseFloat(element.amount);
        sum = sum + amount;
      }
    });
    return sum
  }
  emptyCart(){
    localStorage.removeItem('shoppingCart');
    this.shoppingCart = null;
  }
  UpdateCart(){
    //modify the cart data
    //need to parse into shoppingCart.items to modify a specific entry

    //modify amount
    //modify if monthly
    this.shoppingCart.total=this.getCartTotal(this.shoppingCart.items);
    this.shoppingCart.monthlyTotal=this.getCartMonthlyTotal(this.shoppingCart.items);
  }
  proceedToCheckout(){
    //save all Donation records
    //return to home page
    //send email to user_email 
  }
  continueShopping(){
    //return to Make-Donation
  }
}
