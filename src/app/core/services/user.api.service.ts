import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import {AbstractApiService} from "./abstract.api.service";

@Injectable({
  providedIn: 'root'
})
export class UserApiService extends AbstractApiService {
  getUrl(): string {
    return '/users';
  }

  updateUserPassword(id: string, password: string): Observable<any> {
    return this.post(`${this.getUrl()}/update-password/${id}`, {
      password: password
    });
  }
}
