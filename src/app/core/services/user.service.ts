import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {User} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor() {}

  getUser() {
    let user = localStorage.getItem('user');
    if (user != null) {
      return JSON.parse(user);
    }
  }

  setLoggedInUser(user: any) {
  }
  private userSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  private checkSubject: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(null);

  setUserEntity(user: any) {
    localStorage.setItem('user', user);
    this.userSubject.next(user);
  }

  getUserEntity(): Observable<User | null> {
    return this.userSubject.asObservable();
  }

  clearUserEntity() {
    this.userSubject.next(null);
  }

  setCheck(check: any): void {
    this.checkSubject.next(check);
  }

  getCheck(): Observable<any> {
    return this.checkSubject.asObservable();
  }
}
