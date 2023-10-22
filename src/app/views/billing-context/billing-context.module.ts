import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {InvoiceComponent} from "./invoice/invoice.component";
import {FormsModule} from "@angular/forms";
import {NgbDatepickerModule} from "@ng-bootstrap/ng-bootstrap";
import {NgSelectModule} from "@ng-select/ng-select";
import {FeatherIconModule} from "../../core/feather-icon/feather-icon.module";
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import {NgxDatatableModule} from "@swimlane/ngx-datatable";


const routes: Routes = [{
  path: 'invoice',
  children: [{
    path: ':id',
    component: InvoiceComponent
  }, {
      path: '',
      component: InvoiceListComponent
  }]
}]

@NgModule({
  declarations: [
      InvoiceComponent,
      InvoiceListComponent,
  ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule,
        NgbDatepickerModule,
        NgSelectModule,
        NgxDatatableModule,
    ]
})
export class BillingContextModule {}