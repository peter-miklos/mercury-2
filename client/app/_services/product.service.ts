import { Injectable, Inject }               from '@angular/core';
import { Http, Headers, RequestOptions, Response}   from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { AuthenticationService }    from './authentication.service';
import { Product }                  from '../_models/product.model';

@Injectable()
export class ProductService {

  private productUrl = 'http://localhost:4000/api/v1';
  private headers = new Headers({
    'Authorization': `Bearer ${this.authenticationService.token}`
  });

  constructor(
    @Inject(Http) private http: Http,
    @Inject(AuthenticationService) private authenticationService: AuthenticationService,

  ) {}

  getProducts(): Promise<Product[]> {
    return this.http.get(`${this.productUrl}/products`, { headers: this.headers})
               .toPromise()
               .then(res => res.json().data as Product)
               .catch(this.handleError)
  }

  getProduct(id: string): Promise<Product> {
    const url = `${this.productUrl}/${id}`;
    return this.http.get(url, { headers: this.headers})
               .toPromise()
               .then(res => res.json().data as Product)
               .catch(this.handleError)
  }

  update(product: Product): Promise<Product> {
    const url = `${this.productUrl}/${product._id}`;
    return this.http.put(url, JSON.stringify(product), { headers: this.headers})
               .toPromise()
               .then(res => res.json().data as Product)
               .catch(this.handleError)
  }

  create(product: Product): Promise<Product> {
    const url = `${this.productUrl}/prdouct`;
    return this.http.post(url, JSON.stringify(product), { headers: this.headers})
               .toPromise()
               .then(res => res.json().data as Product)
               .catch(this.handleError)
  }

  delete(id: string): Promise<string> {
    const url = `${this.productUrl}/${id}`;
    return this.http.delete(url, { headers: this.headers})
               .toPromise()
               .then(res => res.json().data as string)
               .catch(this.handleError)
  }

  private handleError(error: any): Promise<any> {
    console.error("An error occured", error);
    return Promise.reject(error.message || error);
  }
}
