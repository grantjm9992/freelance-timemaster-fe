import {Injectable} from "@angular/core";
import {ApiService} from "./api.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export abstract class AbstractApiService extends ApiService {

  abstract getUrl(): string;

  getAll(query_string: string = ''): Observable<any> {
    return this.get(`${this.getUrl()}?${query_string}`);
  }

  find(id: string): Observable<any> {
    return this.get(`${this.getUrl()}/${id}`);
  }

  create(entity: any) {
    return this.post(`${this.getUrl()}`, entity);
  }

  update(id: string, entity: any) {
    return this.post(`${this.getUrl()}/${id}`, entity);
  }

  remove(id: string) {
    return this.delete(`${this.getUrl()}/${id}`);
  }
}
