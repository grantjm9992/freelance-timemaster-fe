import { Injectable } from '@angular/core';
import {AbstractApiService} from "./abstract.api.service";

@Injectable({
  providedIn: 'root'
})
export class TaskApiService extends AbstractApiService {
  getUrl(): string {
    return "/tasks";
  }
}
