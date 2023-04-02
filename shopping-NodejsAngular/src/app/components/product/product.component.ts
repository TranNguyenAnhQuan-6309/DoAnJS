import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    activatedRoute.params.subscribe((params) => {
      if(params.searchTerm)
      this.products = this.productservice.getAllProductBySearchTerm(params.searchTerm);
      else if(params.category_name)
      this.products = this.productservice.getAllProductByCategory(params.category_name);
      else
      this.products = productservice.getAll();
    }) 
  }

  ngOnInit(): void{
  }
}
