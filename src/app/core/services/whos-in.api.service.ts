import { Injectable } from '@angular/core';
import {AbstractApiService} from "./abstract.api.service";

@Injectable({
  providedIn: 'root'
})
export class WhosInApiService extends AbstractApiService {
  getUrl(): string {
    return "/whos-in";
  }
}
