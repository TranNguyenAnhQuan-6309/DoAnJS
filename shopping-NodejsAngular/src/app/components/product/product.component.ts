import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductService } from 'src/app/services/product.services';
import { product } from 'src/app/shared/models/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit{
  products:product[] = [];
  constructor(private productservice:ProductService, activatedRoute:ActivatedRoute){
    let productObservalbe:Observable<product[]>;
    activatedRoute.params.subscribe((params) => {
      if(params.searchTerm)
        productObservalbe = this.productservice.getAllProductBySearchTerm(params.searchTerm);
      else if(params.category_name)
        productObservalbe = this.productservice.getAllProductByCategory(params.category_name);
      else
        productObservalbe = productservice.getAll();

        productObservalbe.subscribe((serverProduct) => {
          this.products = serverProduct;
        })
    }) 
  }

  ngOnInit(): void{
  }
}
