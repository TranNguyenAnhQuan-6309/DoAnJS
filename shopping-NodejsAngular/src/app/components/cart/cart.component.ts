import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.services';
import { cart } from 'src/app/shared/models/cart';
import { itemcart } from 'src/app/shared/models/itemcart';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{
  cart!: cart;
  constructor(private cartService: CartService){
    this.cartService.getCartObservable().subscribe((cart) => {
      this.cart = cart;
    })
  }

  ngOnInit(): void {
  }

  removeFromCart(itemcart:itemcart){
    this.cartService.removeFromCart(itemcart.product.product_id);
  }

  changeQuantity(itemcart:itemcart, quantityInString: string){
    const quantity = parseInt(quantityInString);
    this.cartService.changeQuantity(itemcart.product.product_id, quantity);
  }
}
