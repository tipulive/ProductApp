import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Config} from './config';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
config=new Config();


  constructor(private http: HttpClient) { }
  getProducts(): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.config.getToken()}`);
    return this.http.get<Product[]>(`${this.config.apiUrl()}/getProducts`,{ headers });
  }
  getProductById(id: number): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.config.getToken()}`);
    return this.http.get<Product[]>(`${this.config.apiUrl()}/getProductById/${id}`,{ headers });
  }
  getProductByName(name: any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.config.getToken()}`);
    return this.http.get<Product[]>(`${this.config.apiUrl()}/getProductByName/${name}`,{ headers });
  }
  addProduct(product: Product): Observable<any> {

    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.config.getToken()}`);
    return this.http.post<Product>(`${this.config.apiUrl()}/addProduct`, product,{ headers });
  }
  updateProduct(id:number,product: Product): Observable<any>{
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.config.getToken()}`);
    return this.http.put<Product>(`${this.config.apiUrl()}/updateProduct/${id}`, product,{ headers });
  }

  deleteProduct(id:number): Observable<any>{
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.config.getToken()}`);
    return this.http.delete<Product>(`${this.config.apiUrl()}/deleteProduct/${id}`,{ headers });
  }
}

interface Product {
  id: number;
  uid:number;
  name: string;
  description: string;
  price: string;
}
