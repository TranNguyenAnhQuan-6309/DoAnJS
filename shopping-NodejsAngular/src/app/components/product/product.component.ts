import { Component } from '@angular/core';
import { ProductService } from 'src/app/services/product.services';
import { product } from 'src/app/shared/models/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent{
  products:product[] = [];
  constructor(private productservice:ProductService){
    this.products = productservice.getAll();
  }

  ngOnInit(): void{
  }
}
