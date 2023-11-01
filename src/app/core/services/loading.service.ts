import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  setLoading(_loading: boolean): void {
    this.loading.next(_loading);
  }
  getLoading(): Observable<any> {
    return this.loading.asObservable();
  }
}
