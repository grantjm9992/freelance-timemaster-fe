import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import { ColumnMode } from '@swimlane/ngx-datatable';
import {CheckApiService} from "../../../core/services/check.api.service";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {AddManualCheckModalComponent} from "../add-manual-check-modal/add-manual-check-modal.component";
import Swal from "sweetalert2";
import {UserService} from "../../../core/services/user.service";
import {User} from "../../../core/models/user.model";
import {Utils} from "../../../core/services/utils";
import {CheckService} from "../../../core/services/check.service";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  rows = [];
  loadingIndicator = true;
  reorderable = true;
  ColumnMode = ColumnMode;
  user: User;

  constructor(
      private apiService: CheckApiService,
      private router: Router,
      private activatedRoute: ActivatedRoute,
      private userService: UserService,
      private checkService: CheckService
  ) {
    this.checkService.successCallback = () => {
      this.getTableData();
    }
  }

  ngOnInit(): void {
    this.getTableData();
    this.userService.getUserEntity().subscribe(res => {
      if (res) {
        this.user = res;
      }
    });
  }

  private getTableData(): void {
    this.apiService.getAll().subscribe((response) => {
      this.rows = response.data;
      this.loadingIndicator = false;
    });
  }

  onRowClicked(event: any): void {
    if (event.type === 'click') {
      if (event.row.date_ended === null) {
        return;
      }
      const id = event.row.id;
      this.apiService.find(id).subscribe(res => {
        const check = res.data;
        this.checkService.addManualCheck(this.user, check);
      });
    }
  }

  addManualCheck(): void {
    this.checkService.addManualCheck(this.user);
  }
}

