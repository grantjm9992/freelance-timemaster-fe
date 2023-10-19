import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventApiService extends ApiService {

  getEvents(date: string = '', by_teacher: any = '', company_id: string = '', my_calendar: string = ''): Observable<any> {
    return this.get(`/events?date=${date}&by_teacher=${by_teacher}&company_id=${company_id}&my_calendar=${my_calendar}`);
  }

  getEvent(id: string):  Observable<any> {
    return this.get(`/events/${id}`);
  }

  updateEvent(id: string, event: any) {
    return this.post(`/events/${id}`, event);
  }

  updateEventForGroup(groupId: string, event: any) {
    console.log(event);
    return this.post(`/events/update-events-for-group/${groupId}`, event);
  }

  deleteEventsForGroup(groupId: string, dateRangeStart: string) {
    return this.post(`/events/delete-events-for-group/${groupId}`, {
      date_range_start: dateRangeStart
    });
  }

  deleteEvent(eventId: string) {
    return this.delete(`/events/${eventId}`);
  }

  updateEventClassroom(id: string, classroomId: string) {
    return this.post(`/events/update-classroom/${id}/${classroomId}`);
  }

  updateEventStart(id: string, dates: any) {
    return this.post(`/events/update-dates/${id}`, dates);
  }

  updateEventTeacher(id: string, teacherId: string) {
    return this.post(`/events/update-teacher/${id}/${teacherId}`);
  }

  createEvent(event: any) {
    return this.post(`/events`, event);
  }

  getEventTypes(): Observable<any> {
    return this.get('/event-type');
  }
}
