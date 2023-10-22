import { Component, OnInit } from '@angular/core';
import {InvoiceApiService} from "../../../core/services/invoice.api.service";
import { ColumnMode } from '@swimlane/ngx-datatable';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.scss']
})
export class InvoiceListComponent implements OnInit {

  rows = [];
  loadingIndicator = true;
  reorderable = true;
  ColumnMode = ColumnMode;
  constructor(
      private invoiceApiService: InvoiceApiService,
      private router: Router,
      private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.invoiceApiService.getAll().subscribe((response) => {
      this.rows = response.data;
      this.loadingIndicator = false;
    });
  }

  onRowClicked(event: any) {
    if (event.type === 'click') {
      const id = event.row._id;
      this.router.navigate([id], { relativeTo: this.activatedRoute });
    }
  }
}
