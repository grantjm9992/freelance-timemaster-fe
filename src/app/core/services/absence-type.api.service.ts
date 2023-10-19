import { Injectable } from '@angular/core';
import {AbstractApiService} from "./abstract.api.service";

@Injectable({
  providedIn: 'root'
})
export class AbsenceTypeApiService extends AbstractApiService {
  getUrl(): string {
    return '/absence-type';
  }
}
