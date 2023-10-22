import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import {UserService} from "../services/user.service";
import {AuthApiService} from "../services/auth.api.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private userService: UserService, private authApiService: AuthApiService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.userService.getUserEntity().subscribe(user => {
      if (!user) {
        this.authApiService.refresh().subscribe(res => {
          this.userService.setUserEntity(res.user);
          this.userService.setCheck(res.check);
          localStorage.setItem('isLoggedin', 'true');
          localStorage.setItem('token', res.authorisation.token);
          return true;
        }, err => {
          return false;
        })
      }
    });

    if (localStorage.getItem('isLoggedin')) {
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
