import { Component, OnInit } from '@angular/core';
import {ClientApiService} from "../../../core/services/client.api.service";
import {ActivatedRoute, Router} from "@angular/router";
import { ColumnMode } from '@swimlane/ngx-datatable';
import {ProjectApiService} from "../../../core/services/project.api.service";

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  rows = [];
  loadingIndicator = true;
  reorderable = true;
  ColumnMode = ColumnMode;

  constructor(
    private projectApiService: ProjectApiService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.projectApiService.getAll().subscribe((response) => {
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
