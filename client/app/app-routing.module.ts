import { NgModule }               from '@angular/core';
import { Routes, RouterModule }   from '@angular/router';

import { LoginComponent }         from './login/login.component';
import { HomeComponent }          from './home/home.component';
import { AuthGuard }              from './_guards/auth.guard';
import { ProductsComponent }      from './products/products.component';
import { ProductFormComponent }   from './products/product-form.component';
import { ProductDetailComponent } from './products/product-detail.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'products', component: ProductsComponent, canActivate: [AuthGuard] },
  { path: 'products/new', component: ProductFormComponent, canActivate: [AuthGuard] },
  { path: 'products/:id', component: ProductDetailComponent, canActivate: [AuthGuard] },
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes),
    RouterModule.forChild(appRoutes)
  ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {};
