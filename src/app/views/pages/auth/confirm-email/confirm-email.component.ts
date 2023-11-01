import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthApiService} from "../../../../core/services/auth.api.service";
import {LoadingService} from "../../../../core/services/loading.service";

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.scss']
})
export class ConfirmEmailComponent implements OnInit {

  constructor(
      private activatedRoute: ActivatedRoute,
      private authApiService: AuthApiService,
      private router: Router,
      private loadingService: LoadingService
  ) { }

  ngOnInit(): void {
    const token = this.activatedRoute.snapshot.queryParams.token;
    if (token) {
      this.authApiService.confirmEmail(token).subscribe(res => {
        this.loadingService.setLoading(false);
        this.router.navigate(['/auth/login']);
      }, err => {
        this.router.navigate(['/error/404']);
      });
    }
  }

}
