import { Component, OnInit, Input } from "@angular/core";
import { OrderService } from "src/app/services/order.service";
import { AuthService } from "src/app/services/auth.service";
declare const require: any;
const jsPDF = require('jspdf');
import { User } from "src/app/models/User";
import { Order } from "src/app/models/Order";


@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent implements OnInit{
  @Input() user: User;
  orders: Order[];
  count = 0;
  last = "";
  currentDate: string = "";
  cities: Array<String> = [
    "Ho Chi Minh",
    "Ha Noi",
    "Hue",
    "Da Nang",
    "Vung Tau",
    "Nha Trang",
    "Can Tho",
    "Cam Ranh",
    "Hai Phong"
  ];
  isEmpty: boolean = false;
  warning: string = "";

  isLoading: boolean = true;
  display: string = "none";
  modalHeader: string = "";
  modalBody: string = "";

  constructor(private orderService: OrderService, private authService: AuthService) {}

  ngOnInit() {
    this.currentDate = this.getCurrentDate(new Date());
    this.isLoading = false;
  }

  onFinalizeOrder(form:any) {
    this.isEmpty = false;
    if (
      !form.valid ||
      !this.checkCreditCard(form.controls.credit.value) ||
      !this.checkShipDate(form.controls.ship.value)
    ) {
      this.isEmpty = true;
      this.warning = "Please fill all required fields";
      if (!this.checkCreditCard(form.controls.credit.value) && form.valid)
        this.warning = "Credit cart number is invalid";
      if (!this.checkShipDate(form.controls.ship.value) && form.valid)
        this.warning = "Shipping date is invalid, must be current date or follow it";
      this.display = "none";
    } 
    
  }

  // download pdf receipt
  download() {
    this.isLoading = true;
    this.authService.currentUserOrdersData.subscribe(
      (      order: { _id: string; user: { order: any; ship: any; street: any; city: any; credit: string; }; products: { prod_name: any; quantity: any; prod_total: number; }[]; total: number; }) => {
        this.isLoading = false;
        this.count++;
        if (order && this.count == 2 && this.last !== order._id) {
          this.last = order._id;
          let orderDates = `Order date: ${this.adjustDate(
              this.getCurrentDate(order.user.order)
            )}\tShipping date: ${this.adjustDate(this.getCurrentDate(order.user.ship))}`,
            shipAddress = `Shipping address: ${order.user.street}, ${order.user.city}`,
            userInfo = `[ ID: ${this.user.cardId} ] ${this.user.fname} ${this.user.lname}`,
            itemsTXT = "";
          order.products.forEach(
            (            item: { prod_name: any; quantity: any; prod_total: number; }) =>
              (itemsTXT += `${item.prod_name}\tx ${item.quantity} units\ttotal:  ${item.prod_total.toFixed(2)} ILS\n\n`)
          );
          let doc = new jsPDF();
          doc.setFontSize(22);
          doc.setFontStyle("bold");
          doc.text("Thank you for shopping at ngMarket", 20, 20);
          doc.setLineWidth(0.5);
          doc.line(0, 25, 500, 25);
          doc.setFontSize(12);
          doc.setFontStyle("normal");
          doc.text("Order: " + order._id, 10, 35);
          doc.text(orderDates, 10, 45);
          doc.text(shipAddress, 10, 55);
          doc.text("Customer details: " + userInfo, 10, 65);
          doc.text("Credit card: ****-****-****-" + order.user.credit.slice(-4), 10, 75);
          doc.line(0, 80, 500, 80);
          doc.setFontStyle("bold");
          doc.text("Total price: " + order.total.toFixed(2) + " ILS", 10, 90);
          doc.line(0, 95, 500, 95);
          doc.setFontStyle("normal");
          doc.text(itemsTXT, 10, 105);
          doc.save("receipt-" + this.user.fname + "-" + this.user.lname + "-" + order._id + ".pdf");
        }
      },
      (      err: any) => this.onError()
    );
  }

  // modal
  openModal() {
    this.display = "block";
  }
  onCloseHandled() {
    this.display = "none";
  }
  // shipping date validation
  checkShipDate = (ship: string) => {
    let shipDate = new Date(ship).getTime(),
      orderDate = new Date(Date.now()).getTime();
    if (
      ship.match(/^[0-9]{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])/) &&
      (shipDate >= orderDate || ship === new Date().toISOString().split("T")[0])
    )
      return true;
    else return false;
  };
  getCurrentDate = (date: string | number | Date) => {
    let today = new Date(date),
      current = today.getFullYear().toString();
    if (today.getMonth() + 1 < 10) current += "-0" + (today.getMonth() + 1);
    else current += "-" + (today.getMonth() + 1);
    if (today.getDate() < 10) current += "-0" + today.getDate();
    else current += "-" + today.getDate();
    return current;
  };
  adjustDate = (date: string) => {
    let correct = date.slice(-2) + "/" + date.slice(5, -3) + "/" + date.slice(0, 4);
    return correct;
  };
  // credit card validation
  checkCreditCard = (function(credit) {
    return function(ccNum: string) {
      var len = ccNum.length,
        bit = 1,
        sum = 0,
        val;
      while (len) {
        val = parseInt(ccNum.charAt(--len), 10);
        sum += (bit ^= 1) ? credit[val] : val;
      }
      return sum && sum % 10 === 0;
    };
  })([0, 2, 4, 6, 8, 1, 3, 5, 7, 9]);

  onError() {
    this.modalHeader = "An Error Has Occurred";
    this.modalBody = "Could not proccess your order do to server communication problem. Please try again later.";
    this.openModal();
  }
}
