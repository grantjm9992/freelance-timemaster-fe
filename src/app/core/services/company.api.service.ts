import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyApiService extends ApiService {

  getCompanies(): Observable<any> {
    return this.get('/companies');
  }

  getCompany(id: string):  Observable<any> {
    return this.get(`/companies/${id}`);
  }

  updateCompany(id: string, company: any) {
    return this.post(`/companies/${id}`, company);
  }

  createCompany(company: any) {
    return this.post(`/companies`, company);
  }
}
