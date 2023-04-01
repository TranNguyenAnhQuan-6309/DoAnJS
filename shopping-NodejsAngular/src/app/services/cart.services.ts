import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { cart } from "../shared/models/cart";
import { product } from "../shared/models/product";
import { itemcart } from "../shared/models/itemcart";

@Injectable({
    providedIn: 'root'
})

export class CartService {
    private cart:cart = this.getCartFromLocalStorage();
    private cartSubject: BehaviorSubject<cart> = new BehaviorSubject(this.cart);
    constructor(){}

    addToCart(product:product):void{
        let cartItem = this.cart.items
            .find(item => item.product.product_id == product.product_id);
        if(cartItem)
            return;
        
        this.cart.items.push(new itemcart(product));
        this.setCartToLocalStorage();
    }

    removeFromCart(productId: string):void{
        this.cart.items = this.cart.items
            .filter(item => item.product.product_id != productId);
        this.setCartToLocalStorage();
    }

    changeQuantity(productId: string, quantity: number){
        let cartItem = this.cart.items
            .find(item => item.product.product_id === productId);
        if(!cartItem) return;

        cartItem.quantity = quantity;
        cartItem.price = quantity * cartItem.product.price;
        this.setCartToLocalStorage();
    }

    clearCart(){
        this.cart = new cart();
        this.setCartToLocalStorage();
    }

    getCartObservable(): Observable<cart>{
        return this.cartSubject.asObservable();
    }

    private setCartToLocalStorage():void{
        this.cart.totalPrice = this.cart.items
        .reduce((Sum, currentItem) => Sum + currentItem.price, 0);
        this.cart.totalCount = this.cart.items
        .reduce((Sum, currentItem) => Sum + currentItem.quantity, 0);

        const cartJson = JSON.stringify(this.cart);
        localStorage.setItem('cart', cartJson);
        this.cartSubject.next(this.cart);
    }

    private getCartFromLocalStorage():cart{
        const cartJson = localStorage.getItem('cart');
        return cartJson? JSON.parse(cartJson): new cart();
    }
}