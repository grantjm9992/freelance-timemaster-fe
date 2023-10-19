import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class AuthApiService extends ApiService {

  login(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this.post('/login', body);
  }

  register(body: any): Observable<any> {
    return this.post('/register', body);
  }

  refresh(): Observable<any> {
    return this.post('/refresh', {});
  }

  confirmEmail(token: any): Observable<any> {
    return this.post('/confirm-email', {token: token});
  }

  logout(): Observable<any> {
    return this.post('/logout');
  }

  setPassword(object: any): Observable<any> {
    return this.post('/set-password', object);
  }
}
