import { Component, OnInit } from '@angular/core';
import {ClientApiService} from "../../../core/services/client.api.service";
import {ActivatedRoute, Router} from "@angular/router";
import { ColumnMode } from '@swimlane/ngx-datatable';
import {UserApiService} from "../../../core/services/user.api.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  rows = [];
  loadingIndicator = true;
  reorderable = true;
  ColumnMode = ColumnMode;

  constructor(
    private userApiService: UserApiService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.userApiService.getAll().subscribe((response) => {
      this.rows = response.data;
      this.loadingIndicator = false;
    });
  }

  onRowClicked(event: any) {
    if (event.type === 'click') {
      const id = event.row.id;
      this.router.navigate([id], { relativeTo: this.activatedRoute });
    }
  }
}
