import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.services';
import { product } from 'src/app/shared/models/product';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit{
  product!: product;
  constructor(activatedRoute:ActivatedRoute, productService:ProductService){
    activatedRoute.params.subscribe((params) => {
      if(params.product_id)
      this.product = productService.getProductById(params.product_id);
    })
  }

  ngOnInit(): void {
  }
}
