import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { MainComponent } from './components/main/main.component';
import { HomeComponent } from './components/home/home.component';
import { ProductComponent } from './components/product/product.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { ContactComponent } from './components/contact/contact.component';
import { CartComponent } from './components/cart/cart.component';
import { AboutComponent } from './components/about/about.component';
import { SearchComponent } from './components/search/search.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { CategoryComponent } from './components/category/category.component';
import { TitleComponent } from './components/title/title.component';


@NgModule({
  declarations: [
    MainComponent,
    HomeComponent,
    ProductComponent,
    NotfoundComponent,
    ContactComponent,
    CartComponent,
    AboutComponent,
    SearchComponent,
    ProductDetailComponent,
    CategoryComponent,
    TitleComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [MainComponent]
})
export class AppModule { }
