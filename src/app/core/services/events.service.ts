import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {EventApiService} from "./event.api.service";
import {asObservable} from "./asObservable";

@Injectable()
export class EventsService {
  private _events: BehaviorSubject<any[]> = new BehaviorSubject([]);
  private _event: BehaviorSubject<any> = new BehaviorSubject({});

  constructor(private eventApiService: EventApiService) {
  }

  get event(): Observable<any> {
    return asObservable(this._event);
  }

  get events(): Observable<any[]> {
    return asObservable(this._events);
  }

}
