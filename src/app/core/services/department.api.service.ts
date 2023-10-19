import { Injectable } from '@angular/core';
import {AbstractApiService} from "./abstract.api.service";

@Injectable({
  providedIn: 'root'
})
export class DepartmentApiService extends AbstractApiService {
  getUrl(): string {
    return '/department';
  }
}
