import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import { ColumnMode } from '@swimlane/ngx-datatable';
import {AbsenceTypeApiService} from "../../../core/services/absence-type.api.service";

@Component({
  selector: 'app-absence-type',
  templateUrl: './absence-type.component.html',
  styleUrls: ['./absence-type.component.scss']
})
export class AbsenceTypeComponent implements OnInit {
  rows = [];
  loadingIndicator = true;
  reorderable = true;
  ColumnMode = ColumnMode;

  constructor(
    private absenceTypeApiService: AbsenceTypeApiService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.absenceTypeApiService.getAll().subscribe((response) => {
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
