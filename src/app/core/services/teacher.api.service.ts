import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeacherApiService extends ApiService {

  getTeachers(company_id: string = ''): Observable<any> {
    return this.get(`/teacher?company_id=${company_id}`);
  }

  getTeacher(id: string):  Observable<any> {
    return this.get(`/teacher/${id}`);
  }

  updateTeacher(id: string, teacher: any) {
    return this.post(`/teacher/${id}`, teacher);
  }

  createTeacher(teacher: any) {
    return this.post(`/teacher`, teacher);
  }

  deleteTeacher(id: string, leave_date: string) {
    return this.post(`/teacher/{id}`, {
      leave_date: leave_date
    });
  }
}
