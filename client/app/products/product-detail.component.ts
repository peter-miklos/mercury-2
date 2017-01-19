import { Component, OnInit }        from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import 'rxjs/add/operator/switchMap';

import { ProductService }           from '../_services/product.service';
import { Product }                  from '../_models/product.model';

@Component({
  moduleId: module.id,
  selector: 'product-detail',
  templateUrl: 'product-detail.component.html',
  styleUrls: []
})

export class ProductDetailComponent implements OnInit {
  private product: Product;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private location: Location
  ){}

  ngOnInit(): void {
    this.route.params
        .switchMap((params: Params) => this.productService.getProduct(params['id']))
        .subscribe(product => this.product = product);
  }


}
