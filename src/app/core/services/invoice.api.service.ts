import { Injectable } from '@angular/core';
import {AbstractApiService} from "./abstract.api.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class InvoiceApiService extends AbstractApiService {
  getUrl(): string {
    return "/invoices";
  }

  getStatistics(): Observable<any> {
    return this.get(`${this.getUrl()}/statistics`);
  }

  getDownloadURL(id: string): string {
    return `${this.baseUrl}${this.getUrl()}/${id}/download`;
  }
}
