import { product } from "./product";

export class itemcart{
    constructor(public product: product){}
    quantity:number = 1;
    price:number = this.product.price;
}