import {Injectable} from '@angular/core';
import { sample_product, sample_category } from 'src/data';
import {product} from '../shared/models/product';
import { category } from '../shared/models/category';

@Injectable({
    providedIn: 'root'
})
export class ProductService{
    constructor() { }

    getAll():product[]{
        return sample_product
    }

    getAllProductBySearchTerm(searchTerm:string){
        return this.getAll().filter(product => product.product_name.toLocaleLowerCase().includes(searchTerm.toLowerCase()))
    }

    getProductById(productId:string):product{
        return this.getAll().find(product => product.product_id == productId) ?? new product();
    }

    getAllCategory():category[]{
        return sample_category;
    }

    getAllProductByCategory(category:string):product[]{
        return category === "All"?
        this.getAll():
        this.getAll().filter(product => product.category_na?.includes(category));
    }
}