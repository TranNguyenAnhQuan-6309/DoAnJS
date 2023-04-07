export class CartDetail {
    public constructor(
        public _id?: string,
        public cartId?: string,
        public productId?: string,
        public count?: number,
        public price?: number,
        public productname?:string
    ) { }
}