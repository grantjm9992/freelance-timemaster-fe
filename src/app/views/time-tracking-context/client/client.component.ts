import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import { ColumnMode } from '@swimlane/ngx-datatable';
import {ClientApiService} from "../../../core/services/client.api.service";

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {

  rows = [];
  loadingIndicator = true;
  reorderable = true;
  ColumnMode = ColumnMode;

  constructor(
    private clientApiService: ClientApiService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.clientApiService.getAll().subscribe((response) => {
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
