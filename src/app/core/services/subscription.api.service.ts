import { Injectable } from '@angular/core';
import {AbstractApiService} from "./abstract.api.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SubscriptionApiService extends AbstractApiService {
  getUrl(): string {
    return "/subscription";
  }

  getStripeToken(): Observable<any>{
    return this.get(`${this.getUrl()}/stripe-token`);
  }
}
