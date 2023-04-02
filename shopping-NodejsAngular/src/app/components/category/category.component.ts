import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.services';
import { category } from 'src/app/shared/models/category';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  category_na?:category[];
  constructor(productService:ProductService){
    this.category_na = productService.getAllCategory();
  }

  ngOnInit(): void {
  }
}
