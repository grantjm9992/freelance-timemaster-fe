import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthApiService} from "../../../../core/services/auth.api.service";

@Component({
  selector: 'app-set-password',
  templateUrl: './set-password.component.html',
  styleUrls: ['./set-password.component.scss']
})
export class SetPasswordComponent implements OnInit {
  public error: any = null;
  public password: any = null;
  public password_confirm: any = null;
  private token: any;

  constructor(private activatedRoute: ActivatedRoute, private authApiService: AuthApiService, private router: Router) { }

  ngOnInit(): void {
     this.token = this.activatedRoute.snapshot.queryParams.token;
  }

  onSubmit() {
    if (this.password_confirm !== this.password) {
      this.error = 'Passwords do not match';
      return;
    }

    if (this.password.length <= 6) {
      this.error = 'Password must be at least 7 characters';
      return;
    }

    const object = {
      password: this.password,
      token: this.token
    };

    this.authApiService.setPassword(object).subscribe(res => {
      this.router.navigate(['/auth/login']);
    }, err => {
      this.error = err.status;
    });
  }


}
