import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {AuthApiService} from "../../../../core/services/auth.api.service";
import {UserService} from "../../../../core/services/user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  returnUrl: any;
  email: string;
  password: string;
  errorMessage: string;

  constructor(private router: Router, private route: ActivatedRoute, private authApiService: AuthApiService, private userService: UserService) { }

  ngOnInit(): void {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onSubmit() {
    this.authApiService.login(this.email, this.password).subscribe((response: any) => {
      localStorage.setItem('isLoggedin', 'true');
      localStorage.setItem('token', response.authorisation.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      this.userService.setUserEntity(response.user);
      if (response.check) {
        this.userService.setCheck(response.check);
      }
      if (response.address) {
        this.userService.setAddress(response.address);
      } else {
        this.returnUrl = '/core/profile';
      }
      if (localStorage.getItem('isLoggedin')) {
        this.router.navigate([this.returnUrl]);
      }
    });
  }

}
