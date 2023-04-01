import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { MainComponent } from './components/main/main.component';
import { HomeComponent } from './components/home/home.component';
import { ProductComponent } from './components/product/product.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { ContactComponent } from './components/contact/contact.component';
import { CartComponent } from './components/cart/cart.component';
import { AboutComponent } from './components/about/about.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './components-Admin/dashboard/dashboard.component';
import { SidenavComponent } from './components-Admin/sidenav/sidenav.component';
import { HeaderComponent } from './components-Admin/header/header.component';


@NgModule({
  declarations: [
    MainComponent,
    HomeComponent,
    ProductComponent,
    NotfoundComponent,
    ContactComponent,
    CartComponent,
    AboutComponent,
    RegisterComponent,
    DashboardComponent,
    SidenavComponent,
    HeaderComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  
  providers: [],
  bootstrap: [MainComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
