import { Injectable } from '@angular/core';
import {AbstractApiService} from "./abstract.api.service";

@Injectable({
  providedIn: 'root'
})
export class TeachingHoursApiService extends AbstractApiService {
  getUrl(): string {
    return '/teaching-hours';
  }
}
