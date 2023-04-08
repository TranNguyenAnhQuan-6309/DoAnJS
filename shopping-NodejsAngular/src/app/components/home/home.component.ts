import { Component, OnInit } from "@angular/core";

import { AuthService } from "src/app/services/auth.service";
import { ProductService } from "src/app/services/product.services";

import { User } from "src/app/models/User";
import { Order } from "src/app/models/Order";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  isAuth: boolean = false;
  user: User = null;
  userOrders: Order = null;
  productsTotal: number = 0;
  ordersTotal: number = 0;

  isLoading: boolean = true;
  display: string = "none";
  modalHeader: string = "";
  modalBody: string = "";

  constructor(private authService: AuthService, private productService: ProductService) {}

  ngOnInit() {

    this.productService.getShopInventory().subscribe(
      res => {
        this.ordersTotal = res.ordersTotal;
        this.productsTotal = res.productsTotal;
        this.isLoading = false;

        this.authService.getCurrentUser().subscribe(res => {
          this.authService.userDetails(res.user);
          this.authService.userOrdersDetails(res.orders[0]);
          this.authService.currentUserData.subscribe(
            user => {
              this.user = user;
              this.authService.currentUserOrdersData.subscribe(
                orders => (this.userOrders = orders),
                err => this.onError()
              );
            },
            err => this.onError()
          );
        });
      },
      err => this.onError()
    );
  }


  openModel() {
    this.display = "block";
  }
  onCloseHandled() {
    this.display = "none";
  }
  onError() {
    this.isLoading=false
    this.modalHeader = "An Error Has Occurred";
    this.modalBody = "Could not load orders & product information do to server communication problem. Please try again later.";
    this.openModel();
  }
}
