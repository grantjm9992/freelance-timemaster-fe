import { Injectable } from '@angular/core';
import {AbstractApiService} from "./abstract.api.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CheckApproversApiService extends AbstractApiService {
  getUrl(): string {
    return "/check-approvers";
  }

  public updateForCompany(companyId: string, approvers: any[]) {
    return this.post( `${this.getUrl()}/${companyId}`, {
      approvers: approvers
    });
  }
}
