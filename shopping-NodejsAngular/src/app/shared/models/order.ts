export class OrderModel {
    public constructor(
        public _id?:string ,
        public cartId?:string,
        public totalPrice?:number,
        public city?:string,
        public address?:string,
        public shippingDate?: Date,
        public orderDate?: Date ,
        public moneyCard?:number
    ){}
}