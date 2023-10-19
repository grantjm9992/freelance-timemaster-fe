import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResourceApiService extends ApiService {

  getResources(): Observable<any> {
    return this.get('/resource-type');
  }
}
