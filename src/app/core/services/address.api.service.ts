import { Injectable } from '@angular/core';
import {AbstractApiService} from "./abstract.api.service";

@Injectable({
  providedIn: 'root'
})
export class AddressApiService extends AbstractApiService {
  getUrl(): string {
    return "/addresses";
  }
}
