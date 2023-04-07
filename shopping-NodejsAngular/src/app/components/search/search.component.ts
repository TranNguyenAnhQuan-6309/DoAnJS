import { Component, OnInit, Input } from '@angular/core';
import { CartDetail } from 'src/app/shared/models/cart-detail';
import { ShoppingCartService } from 'src/app/services/cart.services';
import { UserModel } from 'src/app/shared/models/user';
import { store } from 'src/app/shared/redux/store';
import { ActionType } from 'src/app/shared/redux/action-type';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit{
  public user: UserModel = store.getState().user;
  public shoppingCartProducts: CartDetail[] = [];
  public cartOption:boolean = store.getState().cartOption;

  @Input()
  public imageSrc: string;
  @Input()
  public productName: string;
  @Input()
  public productPrice: number;
  @Input()
  public productId: string;

  public product: CartDetail = new CartDetail();
  constructor(private myShoppingService: ShoppingCartService) { }

  ngOnInit(): void {
    store.subscribe(() => {
      this.user = store.getState().user;
      this.shoppingCartProducts = store.getState().productsOfCart;
      this.cartOption = store.getState().cartOption;
    });
    this.product.count = 1;
  }

  public addToCart(): void {

    const findProduct: CartDetail = this.shoppingCartProducts.find(p => p.productId === this.productId)
    if (findProduct) {
      findProduct.count += +this.product.count;
      findProduct.price += +this.productPrice * this.product.count;
      this.myShoppingService.updateProduct(findProduct)
        .subscribe(res => {
          const action = { type: ActionType.updateProduct, payload: res };
          store.dispatch(action);
        }, err => alert(err.message));
    
      setTimeout(() => {
        const totalPrice = this.myShoppingService.getTotalPrice(this.shoppingCartProducts);
        const action = { type: ActionType.updateTotalPrice, payload: totalPrice };
        store.dispatch(action);
      }, 1000);
      return;
    }

    const cart = JSON.parse(localStorage.getItem("myCart"));
    if (this.product.count <= 0) { alert('invalid number of amount !'); return; }
    this.product.productId = this.productId;
    this.product.productname = this.productName;
    this.product.cartId = cart._id;
    this.product.price = this.productPrice * this.product.count;

    this.myShoppingService.addProductToCart(this.product)
      .subscribe(res => {
        const action = { type: ActionType.addProductToCart, payload: res };
        store.dispatch(action);
      }, err => alert(err.message));

    setTimeout(() => {
      const totalPrice = this.myShoppingService.getTotalPrice(this.shoppingCartProducts);
      const action = { type: ActionType.updateTotalPrice, payload: totalPrice };
      store.dispatch(action);
    }, 1000);
  }
}
