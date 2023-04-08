import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { MainComponent } from './components/main/main.component';
import { HomeComponent } from './components/home/home.component';
import { ProductComponent } from './components/dashboard/product/product.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { ContactComponent } from './components/contact/contact.component';
import { AuthGuard } from "./guards/auth.guard";
import { CartComponent } from './components/dashboard/sidebar/cart/cart.component';
import { AboutComponent } from './components/about/about.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { RegisterComponent } from './components/home/auth/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/home/auth/login/login.component';
import { ToastrModule } from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NontificationPanelComponent } from './components/home/nontification-panel/nontification-panel.component';
import { SidebarComponent } from './components/dashboard/sidebar/sidebar.component';
import { OrderFormComponent } from './components/dashboard/sidebar/cart/order-form/order-form.component';
import { FilterPipe } from "./pipes/filter.pipe";
import { HighlightPipe } from "./pipes/highlight.pipe";
import { ShortenPipe } from "./pipes/shorten.pipe";
import { TokenInterceptorService } from './services/token-interceptor.service';
import { AuthService } from './services/auth.service';

@NgModule({
  declarations: [
    MainComponent,
    HomeComponent,
    ProductComponent,
    NotfoundComponent,
    ContactComponent,
    CartComponent,
    AboutComponent,
    ProductDetailComponent,
    RegisterComponent,
    DashboardComponent,
    ProductDetailComponent,
    LoginComponent,
    NontificationPanelComponent,
    SidebarComponent,
    OrderFormComponent,
    FilterPipe,
    HighlightPipe,
    ShortenPipe
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
  providers: [
    AuthService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
