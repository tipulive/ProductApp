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
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QxOUBnbSIsImlhdCI6MTY4Mjc5OTc3NX0.hiPCqvI04e28CvbGg_Yf7oVfaqBOX0B6OBdgw8xXFIw';
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Product[]>(`${this.config.apiUrl()}/getProducts`,{ headers });
  }
  addProduct(product: Product): Observable<any> {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QxOUBnbSIsImlhdCI6MTY4Mjc5OTc3NX0.hiPCqvI04e28CvbGg_Yf7oVfaqBOX0B6OBdgw8xXFIw';
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<Product>(`${this.config.apiUrl()}/addProduct`, product,{ headers });
  }
}

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
}
