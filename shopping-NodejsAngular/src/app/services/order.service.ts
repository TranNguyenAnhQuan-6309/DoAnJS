import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { User } from "../models/User";


@Injectable({ providedIn: "root" })
export class OrderService {
  private url: string = "http://localhost:5000/shop";

  private userOrder = new BehaviorSubject(null);
  currentUserOrder = this.userOrder.asObservable();

  private orderStatus = new BehaviorSubject(false);
  currentOrderStatus = this.orderStatus.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  changeOrderStatus(status: boolean) {
    this.orderStatus.next(status);
  }

  ordersDetails(orders: any) {
    this.userOrder.next(orders);
  }

  getAllOrders() {
    return this.http.get<any>(this.url + "/orders");
  }

  addProductToCart(user: User, product: any) {
    return this.http.put<any>(this.url + `/cart/${user._id}/${product.id}`, { quantity: product.quantity });
  }

  removeProductFromCart(user: User, product: any) {
    return this.http.put<any>(this.url + `/cart/delete/${user._id}/${product.productId}`, user._id);
  }

  emptyCart(user: User) {
    return this.http.put<any>(this.url + `/empty-cart/${user._id}`, user._id);
  }

  revokeOrder(user: User) {
    return this.http.put<any>(this.url + `/open-cart/${user._id}`, user._id);
  }

  initializeOrder(user: User) {
    return this.http.put<any>(this.url + `/orders/${user._id}`, user._id);
  }

  addOrder(user: { _id: any; }, order: undefined) {
    return this.http.post<any>(this.url + `/orders/${user._id}`, order);
  }
}