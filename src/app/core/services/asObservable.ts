import {Observable, Subject} from "rxjs";

export function asObservable(subject: Subject<any>) {
  return new Observable(fn => subject.subscribe(fn));
}
