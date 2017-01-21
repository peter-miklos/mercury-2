import { Component }                          from '@angular/core';
import { Location }                           from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ProductService }   from '../_services/product.service';

@Component({
  moduleId: module.id,
  selector: 'product-creation',
  templateUrl: 'product-form.component.html',
  styleUrls: []
})

export class ProductFormComponent {
  // private model: any = {};
  productForm: FormGroup;
  private loading = false;

  constructor(
    private productService: ProductService,
    private location: Location,
    fb: FormBuilder
  ){
    this.productForm = fb.group({
      'name': [null, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(20)])],
      'category': [null, Validators.required],
      'group': [null, Validators.required],
      'price': [null, Validators.required],
      'origin': [null, Validators.required]
    })
  }

  goBack(): void {
    this.location.back();
  }

  submit(value: any): void {
    this.loading = true;
    this.productService.create(value)
        .then(() => {
          this.loading = false;
          this.goBack();
        })
  }
}
