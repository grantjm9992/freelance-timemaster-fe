import { Component, OnInit } from '@angular/core';
import {ProjectApiService} from "../../../core/services/project.api.service";
import {ActivatedRoute, Router} from "@angular/router";
import { ColumnMode } from '@swimlane/ngx-datatable';
import {TaskApiService} from "../../../core/services/task.api.service";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  rows = [];
  loadingIndicator = true;
  reorderable = true;
  ColumnMode = ColumnMode;

  constructor(
    private taskApiService: TaskApiService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.taskApiService.getAll().subscribe((response) => {
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
