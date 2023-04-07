import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/product.services';
import { ProductModel } from 'src/app/shared/models/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit{
  public Bed: ProductModel[] = [];
  public Bath: ProductModel[] = [];
  public Game: ProductModel[] = [];
  public Kit: ProductModel[] = [];
  public Lau: ProductModel[] = [];
  public Liv: ProductModel[] = [];
  public searchStatus = false;
  public searchStr: string;
  public searchProducts: ProductModel[] = [];

  constructor(private myProductsService: ProductsService) { }

  ngOnInit(): void {
    const Bed = "BR1";
    const Bath = "BR2";
    const Game = "GR1";
    const Kit = "KC1";
    const Lau = "LA1";
    const Liv = "LR1";

    this.myProductsService.getAllProducts()
      .subscribe(res => {
        res.map(product => {
          if (product.categoryId === Bed) { this.Bed.push(product); }
          if (product.categoryId === Bath) { this.Bath.push(product); }
          if (product.categoryId === Game) { this.Game.push(product); }
          if (product.categoryId === Kit) { this.Kit.push(product); }
          if (product.categoryId === Lau) { this.Lau.push(product); }
          if (product.categoryId === Liv) { this.Liv.push(product); }
        });
      }, err => alert(err.message));
  }

  public searchProduct(): void {
    this.myProductsService.searchProduct(this.searchStr)
      .subscribe(res => {
        this.searchProducts = res;
        this.searchStatus = true;
      }, err => alert(err.message));
  }

  public backToAllProducts(): void {
    this.searchStr = '';
    this.searchStatus = false;
    this.searchProducts = [];
  }
}
