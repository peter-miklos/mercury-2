import { Component }        from '@angular/core';
import { Location }         from '@angular/common';

import { ProductService }   from '../_services/product.service';

@Component({
  moduleId: module.id,
  selector: 'product-creation',
  templateUrl: 'product-form.component.html',
  styleUrls: []
})

export class ProductFormComponent {
  private model: any = {};
  private loading = false;

  constructor(
    private productService: ProductService,
    private location: Location
  ){}

  goBack(): void {
    this.location.back();
  }

  submit(): void {
    this.loading = true;
    this.productService.create(this.model)
        .then(() => {
          this.loading = false;
          this.goBack();
        })
  }
}
