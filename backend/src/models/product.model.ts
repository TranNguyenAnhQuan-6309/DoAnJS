import { Schema, model } from "mongoose";
export interface Product{
    product_id:string;
    description:string;
    image:string;
    price:number;
    product_name:string;
    quantity:number;
    category_na:string[];
}

export const ProductSchema = new Schema<Product>(
    {
        product_name: {type: String, required:true},
        description: {type: String, required:true},
        image: {type: String, required:true},
        price: {type: Number, required:true},
        quantity: {type: Number, required:true},
        category_na: {type: [String]}
    },{
        toJSON:{
            virtuals: true
        },
        toObject:{
            virtuals: true
        },
        timestamps: true
    }
);

export const ProductModel = model<Product>('product', ProductSchema);