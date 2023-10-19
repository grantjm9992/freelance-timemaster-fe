import { Component, OnInit } from '@angular/core';
import {ClassroomApiService} from "../../../core/services/classroom.api.service";
import { ColumnMode } from '@swimlane/ngx-datatable';
import {ActivatedRoute, Router} from "@angular/router";
import {DepartmentApiService} from "../../../core/services/department.api.service";

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {

  rows = [];
  loadingIndicator = true;
  reorderable = true;
  ColumnMode = ColumnMode;

  constructor(
    private departmentApiService: DepartmentApiService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.departmentApiService.getAll().subscribe((response) => {
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
