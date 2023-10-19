import { Injectable } from '@angular/core';
import {AbstractApiService} from "./abstract.api.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CheckReportApiService extends AbstractApiService {
  getUrl(): string {
    return "/check-report";
  }

  getByUser(from: string, to: string): Observable<any> {
    return this.get(`${this.getUrl()}/user?from=${from}&to=${to}`)
  }

  getByTask(from: string, to: string): Observable<any> {
    return this.get(`${this.getUrl()}/task?from=${from}&to=${to}`)
  }

  getByProject(from: string, to: string): Observable<any> {
    return this.get(`${this.getUrl()}/project?from=${from}&to=${to}`)
  }

  getByClient(from: string, to: string): Observable<any> {
    return this.get(`${this.getUrl()}/client?from=${from}&to=${to}`)
  }
}
