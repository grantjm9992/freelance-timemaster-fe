import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbsenceTypeComponent } from './absence-type/absence-type.component';
import { EditAbsenceTypeComponent } from './absence-type/edit-absence-type/edit-absence-type.component';
import {RouterModule, Routes} from "@angular/router";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgSelectModule} from "@ng-select/ng-select";


const routes: Routes = [{
  path: 'absence-type',
  children: [{
    path: '',
    component: AbsenceTypeComponent,
  }, {
    path: ':id',
    component: EditAbsenceTypeComponent
  }],
}]

@NgModule({
  declarations: [
    AbsenceTypeComponent,
    EditAbsenceTypeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgxDatatableModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
  ]
})
export class HrContextModule { }
