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

  download(id: string): Observable<any> {
    return this.get(`${this.getUrl()}/${id}/download`);
  }
}
