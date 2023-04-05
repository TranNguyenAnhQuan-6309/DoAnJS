import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
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
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './components-Admin/dashboard/dashboard.component';
import { SidenavComponent } from './components-Admin/sidenav/sidenav.component';
import { HeaderComponent } from './components-Admin/header/header.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { ToastrModule } from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

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
    RegisterComponent,
    DashboardComponent,
    SidenavComponent,
    HeaderComponent,
    ProductDetailComponent,
    LoginComponent
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut:3000,
      positionClass:'toast-bottom-right',
      newestOnTop:false
    })
  ],
  
  providers: [],
  bootstrap: [MainComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
