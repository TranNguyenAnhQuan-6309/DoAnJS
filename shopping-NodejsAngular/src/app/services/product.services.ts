import {Injectable} from '@angular/core';
import { sample_product } from 'src/data';
import {product} from '../shared/models/product';

@Injectable({
    providedIn: 'root'
})
export class ProductService{
    constructor() { }

    getAll():product[]{
        return sample_product
    }
}