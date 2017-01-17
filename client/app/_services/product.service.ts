import { Injectable }               from '@angular/core';
import { Http, Headers, Response}   from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { AuthenticationService }    from './authentication.service';
import { Product }                  from '../_models/product.model';

@Injectable()
export class ProductService {

  private productUrl = 'http://localhost:4000/api/v1/';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(
    private http: Http,
    private authenticationService: AuthenticationService
  ) {}

  getProducts(): Promise<Product[]> {
    return this.http.get(this.productUrl + 'products', this.headers)
               .toPromise()
               .then(res => res.json().data as Product)
               .catch(this.handleError)
  }

  getProduct(id: string): Promise<Product> {
    const url = `${this.productUrl}/${id}`;
    return this.http.get(url, this.headers)
               .toPromise()
               .then(res => res.json().data as Product)
               .catch(this.handleError)
  }

  update(product: Product): Promise<Product> {
    const url = `${this.productUrl}/${product._id}`;
    return this.http.put(url, JSON.stringify(product), {headers: this.headers})
               .toPromise()
               .then(res => res.json().data as Product)
               .catch(this.handleError)
  }

  private handleError(error: any): Promise<any> {
    console.error("An error occured", error);
    return Promise.reject(error.message || error);
  }
}
