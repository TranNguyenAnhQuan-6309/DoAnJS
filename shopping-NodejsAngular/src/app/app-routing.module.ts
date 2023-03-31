import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ContactComponent } from './components/contact/contact.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { ProductComponent } from './components/product/product.component';
import { ServicesComponent } from './components/services/services.component';

const routes: Routes = [
  {path:'',component: HomeComponent},
  {path:'product',component: ProductComponent},
  {path:'product/:product_id', component: ProductDetailComponent},
  {path: 'search/:searchTerm',component: ProductComponent},
  {path: 'category/:category_name',component: ProductComponent},
  {path:'lien-he',component: ContactComponent},
  {path:'gio-hang',component: CartComponent},
  {path:'gioi-thieu',component: AboutComponent},
  {path:'dich-vu',component: ServicesComponent},
  {path:'login',component: LoginComponent},
  {path:'**',component: NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
