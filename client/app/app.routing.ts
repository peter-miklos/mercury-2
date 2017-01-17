import { Routes, RouterModule } from '@angular/router';

import { LoginComponent }       from './login/login.component';
import { HomeComponent }        from './home/home.component';
import { AuthGuard }            from './_guards/auth.guard';
import { AllProductsComponent } from './products/allProducts.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'allproducts', component: AllProductsComponent, canActivate: [AuthGuard] },
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
