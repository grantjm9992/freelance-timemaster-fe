import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepartmentComponent } from './department.component';
import { EditComponent } from './edit/edit.component';
import {RouterModule, Routes} from "@angular/router";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgSelectModule} from "@ng-select/ng-select";

const routes: Routes = [
  {
    path: '',
    component: DepartmentComponent,
  },
  {
    path: ':id',
    component: EditComponent,
  }
]

@NgModule({
  declarations: [
    DepartmentComponent,
    EditComponent
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
export class DepartmentModule { }
