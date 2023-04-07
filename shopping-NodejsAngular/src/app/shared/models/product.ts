export class ProductModel {
    public constructor(
        public _id?:string,
        public productname?:string,
        public categoryId?:string,
        public description?:string,
        public price?:number,
        public quantity?:number,
        public image?:string | File
    ){}
}