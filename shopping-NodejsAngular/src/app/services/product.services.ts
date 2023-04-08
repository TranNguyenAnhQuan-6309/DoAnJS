import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";

@Injectable({ providedIn: "root" })
export class ProductService {
  private url = "http://localhost:5000/shop";

  private products = new BehaviorSubject(null);
  currentProducts = this.products.asObservable();

  private product = new BehaviorSubject(null);
  currentProduct = this.product.asObservable();

  private categories = new BehaviorSubject(null);
  currentCategories = this.categories.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  getShopInventory() {
    return this.http.get<any>(this.url + "/info");
  }

  displayedCategories(categories: any) {
    this.categories.next(categories);
  }

  displayedProducts(products: any) {
    this.products.next(products);
  }

  chosenProduct(product: any) {
    this.product.next(product);
  }

  getAllProducts() {
    return this.http.get<any>(this.url + "/products");
  }

  getAllCategories() {
    return this.http.get<any>(this.url + "/category");
  }

  getProductsByCategory(categoryName: string) {
    return this.http.get<any>(this.url + "/category/" + categoryName);
  }

  getProductsByName(productName: string) {
    return this.http.get<any>(this.url + "/search/" + productName);
  }

  createProduct(newProduct: any) {
    return this.http.post<any>(this.url, newProduct);
  }

  editProduct(productId: string, updatedProduct: any) {
    return this.http.put<any>(this.url + "/" + productId, updatedProduct);
  }

  deleteProduct(productId: string) {
    return this.http.delete<any>(this.url + "/" + productId);
  }

  createCategory(category: any) {
    return this.http.post<any>(this.url + "/category", category);
  }
}