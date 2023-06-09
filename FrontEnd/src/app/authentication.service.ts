import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Config} from './config';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  config=new Config();

  constructor(private http: HttpClient) { }
  register(user: User): Observable<any> {

    return this.http.post<User>(`${this.config.apiUrl()}/register`,user,);
  }
  login(user: User): Observable<any> {

    return this.http.post<User>(`${this.config.apiUrl()}/login`,user,);
  }
  logout(): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.config.getToken()}`);
    return this.http.get(`${this.config.apiUrl()}/logout`,{ headers });
  }
}

interface User {

  name: string;
  email: string;
  password: string;
}
