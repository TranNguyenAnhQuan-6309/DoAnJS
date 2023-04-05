import {Injectable} from '@angular/core';
import { sample_product, sample_category } from 'src/data';
import {product} from '../shared/models/product';
import { category } from '../shared/models/category';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PRODUCT_BY_CATEGORY_URL, PRODUCT_BY_ID_URL, PRODUCT_BY_SEARCH_URL, PRODUCT_CATEGORY_URL, PRODUCT_URL } from 'src/constants/urs';

@Injectable({
    providedIn: 'root'
})
export class ProductService{
    constructor(private http:HttpClient) { }

    getAll():Observable<product[]>{
        return this.http.get<product[]>(PRODUCT_URL);
    }

    getAllProductBySearchTerm(searchTerm:string){
        return this.http.get<product[]>(PRODUCT_BY_SEARCH_URL);
    }

    getProductById(productId:string):Observable<product>{
        return this.http.get<product>(PRODUCT_BY_ID_URL + productId);
    }

    getAllCategory():Observable<category[]>{
        return this.http.get<category[]>(PRODUCT_CATEGORY_URL);
    }

    getAllProductByCategory(category:string):Observable<product[]>{
        return category === "All"?
        this.getAll():
        this.http.get<product[]>(PRODUCT_BY_CATEGORY_URL + category);
    }
}