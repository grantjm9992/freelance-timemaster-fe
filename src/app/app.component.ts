import { Component, OnInit } from '@angular/core';
import {LoadingService} from "./core/services/loading.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'nobleui-angular';
  loading: boolean = false;

  constructor(private loadingService: LoadingService) {
  }
  ngOnInit(): void {
    this.loadingService.getLoading().subscribe((res) => {
      this.loading = res;
    });
  }

}
