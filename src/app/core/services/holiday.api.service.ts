import { Injectable } from '@angular/core';
import {AbstractApiService} from "./abstract.api.service";

@Injectable({
  providedIn: 'root'
})
export class HolidayApiService extends AbstractApiService {
  getUrl(): string {
    return '/holidays';
  }

  accept(id: string) {
    return this.get(`${this.getUrl()}/${id}/accept`);
  }

  reject(id: string) {
    return this.get(`${this.getUrl()}/${id}/reject`);
  }

  revoke(id: string) {
    return this.get(`${this.getUrl()}/${id}/revoke`);
  }
}
