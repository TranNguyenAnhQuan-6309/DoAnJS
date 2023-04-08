import { Component, Input, OnInit, OnChanges, SimpleChanges } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { Order } from "src/app/models/Order";
import { User } from "src/app/models/User";

@Component({
  selector: 'app-nontification-panel',
  templateUrl: './nontification-panel.component.html',
  styleUrls: ['./nontification-panel.component.css']
})
export class NontificationPanelComponent implements OnInit, OnChanges{
  @Input() user: User;
  orders: Order[];
  total: number = 0;

  isLoading: boolean = true;
  display: string = "none";
  modalHeader: string = "";
  modalBody: string = "";

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService
      .getCurrentUser()
      .subscribe(res => (this.authService.userDetails(res.user), this.authService.userOrdersDetails(res.orders[0])));
    this.authService.currentUserData.subscribe(user => (this.user = user));
    this.authService.currentUserOrdersData.subscribe(orders => (this.orders = orders));
    this.isLoading = false;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.total = 0;
    this.user.cart.items.forEach(item => (this.total += item.prod_total));
  }


  openModel() {
    this.display = "block";
  }
  onCloseHandled() {
    this.display = "none";
  }
  onError() {
    this.isLoading = false;
    this.modalHeader = "An Error Has Occurred";
    this.modalBody =
      "Could not show user purchases & cart info do to server communication problem. Please try again later.";
    this.openModel();
  }
}
