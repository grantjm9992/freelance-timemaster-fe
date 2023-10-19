import { Injectable } from '@angular/core';
import {AbstractApiService} from "./abstract.api.service";

@Injectable({
  providedIn: 'root'
})
export class EventTypeApiService extends AbstractApiService {
  getUrl(): string {
    return '/event-type';
  }
}
