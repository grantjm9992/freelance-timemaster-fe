import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClassroomApiService extends ApiService {

  getClassrooms(company_id: string = ''): Observable<any> {
    return this.get(`/classroom?company_id=${company_id}`);
  }

  getClassroom(id: string): Observable<any> {
    return this.get(`/classroom/${id}`);
  }

  createClassroom(classroom: any) {
    return this.post(`/classroom`, classroom);
  }

  updateClassroom(id: string, classroom: any) {
    return this.post(`/classroom/${id}`, classroom);
  }
}
