import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
  <nav>
    <a routerLink="/" routerLinkActive="active">Home</a> |
    <a routerLink="/products" routerLinkActive="active">All products</a> |
    <a routerLink="/products/new" routerLinkActive="active">Add new product</a>
  </nav>
  <router-outlet></router-outlet>
  `,
})
export class AppComponent {}
