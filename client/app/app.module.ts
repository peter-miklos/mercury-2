import { NgModule }               from '@angular/core';
import { BrowserModule }          from '@angular/platform-browser';
import { FormsModule }            from '@angular/forms';
import { HttpModule }             from '@angular/http';
import { MdCardModule }           from '@angular2-material/card';
import { MdButtonModule }         from '@angular2-material/button';
import { MdIconModule }           from '@angular2-material/icon';
import { MdIconRegistry }         from '@angular2-material/icon';

import { AppComponent }           from './app.component';
import { routing }                from './app.routing';

import { AuthGuard }              from './_guards/auth.guard';
import { AuthenticationService }  from './_services/authentication.service';
import { UserService }            from './_services/user.service';
import { ProductService }         from './_services/product.service';
import { LoginComponent }         from './login/login.component';
import { HomeComponent }          from './home/home.component';
import { ProductsComponent }   from './products/products.component';

@NgModule({
  imports:      [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    MdCardModule,
    MdButtonModule,
    MdIconModule
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ProductsComponent
  ],
  bootstrap:    [ AppComponent ],
  providers:    [
    MdIconRegistry,
    AuthGuard,
    AuthenticationService,
    UserService,
    ProductService
  ]
})
export class AppModule { }
