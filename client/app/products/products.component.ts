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

  onSelect(product: Product): void {
    this.selectedProduct = product;
  }

  goToDetail(): void {
    this.router.navigate(['/products', this.selectedProduct._id]);
  }

  delete(product: Product): void {
    this.productService.delete(product._id)
        .then(() => {
          this.products = this.products.filter(p => p != product);
          if (this.selectedProduct === product) {this.selectedProduct = null; }
        })
  }
}
