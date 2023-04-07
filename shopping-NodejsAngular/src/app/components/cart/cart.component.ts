import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/shared/models/user';
import { store } from 'src/app/shared/redux/store';
import { CartDetail } from 'src/app/shared/models/cart-detail';
import { Cart } from 'src/app/shared/models/cart';
import { ShoppingCartService } from 'src/app/services/cart.services';
import { ActionType } from 'src/app/shared/redux/action-type';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{
  public user: UserModel = store.getState().user;
  public shoppingCartOpen: boolean = true;
  public shoppingCartProducts: CartDetail[] = [];
 
  public cart: Cart | string;
  public totalPrice: number;
  public cartOption = false;
  public userActive: boolean = false;

  constructor(private myShoppingService: ShoppingCartService) { }

  ngOnInit(): void {
    
    store.subscribe(() => {
      this.user = store.getState().user;
      this.shoppingCartProducts = store.getState().productsOfCart;
      this.totalPrice = store.getState().totalPrice;
      this.userActive = store.getState().userActive;
      this.cartOption = store.getState().cartOption;
    });
    
    const localCart = localStorage.getItem("myCart");

    setTimeout(() => {
    
      if (!this.cart && !localCart) {
        if (this.user) {
          this.createCart();
        }
      }
    }, 5000);
  
    if (localCart && !this.userActive) {
      const action = { type: ActionType.updateUserActive, payload: true };
      store.dispatch(action);
      this.cart = JSON.parse(localCart);
      store.dispatch({ type: ActionType.updateCartOption, payload: true });
    }
  }

  public createCart(): void {
    this.myShoppingService.createCart({ _id: this.user._id })
      .subscribe(res => {
        this.cart = res;
        localStorage.setItem("myCart", JSON.stringify(res));
      }, err => alert(err.message));
  }

  public continueShopping(): void {
  
    const localCart = localStorage.getItem("myCart");
    this.myShoppingService.getAllProducts({ cartId: JSON.parse(localCart)._id })
      .subscribe(res => {
        const action = { type: ActionType.getAllProductsOfCart, payload: res };
        store.dispatch(action);
        store.dispatch({ type: ActionType.updateCartOption, payload: false });
        this.getTotalPrice();
      }, err => alert(err.message));
  }

  public getTotalPrice(): void {
    const totalPrice = this.myShoppingService.getTotalPrice(this.shoppingCartProducts);
    const action = { type: ActionType.updateTotalPrice, payload: totalPrice };
    store.dispatch(action);
  }

  public clearCart(): void {
    const answer = window.confirm("Are you sure?");
    if (!answer) {
      return;
    }
    const myCart: any = this.cart;
    this.myShoppingService.deleteCart(myCart)
      .subscribe(res => {
        localStorage.removeItem("myCart");
        this.createCart();
        store.dispatch({ type: ActionType.updateCartOption, payload: false });
        const action = { type: ActionType.getAllProductsOfCart, payload: [] as string[] };
        store.dispatch(action);
      }, err => alert(err.message));
  }
  
  public collapse(): void {
    const productsDiv = document.getElementById("productsDiv");
    if (this.shoppingCartOpen) { this.shoppingCartOpen = false; productsDiv.style.width = "80%" }
    else { this.shoppingCartOpen = true; productsDiv.style.width = "70%" }
  }

  public removeProductFromCart(_id: string): void {
    
    this.myShoppingService.removeFromCart(_id)
      .subscribe(res => {
        const action = { type: ActionType.removeFromCart, payload: _id };
        store.dispatch(action);
      }, err => alert(err.message));
    
    setTimeout(() => {
      this.getTotalPrice();
    }, 1000);
  }

}
