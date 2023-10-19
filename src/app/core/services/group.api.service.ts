import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupApiService extends ApiService {

  getGroups(): Observable<any> {
    return this.get('/groups');
  }
}
