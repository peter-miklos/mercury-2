import { Component, OnInit }  from '@angular/core';
import { Router }             from '@angular/router';

import { Product }            from '../_models/product.model';
import { ProductService }     from '../_services/product.service';

@Component({
  moduleId: module.id,
  selector: 'all-products',
  templateUrl: 'products.component.html',
  styleUrls: []
})

export class ProductsComponent implements OnInit {
  products: Product[];
  selectedProduct: Product;

  constructor(
    private productService: ProductService,
    private router: Router
  ) {}

  getProducts(): void {
    this.productService.getProducts().then(products => this.products = products);
  }

  ngOnInit(): void {
    this.getProducts();
  }
}
