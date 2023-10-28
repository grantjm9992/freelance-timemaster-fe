import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {ClientComponent} from './client/client.component';
import {ProjectComponent} from './project/project.component';
import {TaskComponent} from './task/task.component';
import {ClientEditComponent} from './client/client-edit/client-edit.component';
import {ProjectEditComponent} from './project/project-edit/project-edit.component';
import {TaskEditComponent} from './task/task-edit/task-edit.component';
import {RouterModule, Routes} from "@angular/router";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgSelectModule} from "@ng-select/ng-select";
import {PersonalCalendarComponent} from './personal-calendar/personal-calendar.component';
import {FullCalendarModule} from "@fullcalendar/angular";
import {CompanyCalendarComponent} from './company-calendar/company-calendar.component';
import {CheckInModalComponent} from './check-in-modal/check-in-modal.component';
import {ArchwizardModule} from "angular-archwizard";
import {LayoutModule} from "../layout/layout.module";
import { ReportComponent } from './report/report.component';
import {NgApexchartsModule} from "ng-apexcharts";
import {NgbDatepickerModule, NgbTimepickerModule, NgbTooltipModule} from "@ng-bootstrap/ng-bootstrap";
import { WhosInComponent } from './whos-in/whos-in.component';
import { AddManualCheckModalComponent } from './add-manual-check-modal/add-manual-check-modal.component';
import { ListComponent } from './list/list.component';


const routes: Routes = [
  {
    path: 'client',
    children: [{
      path: '',
      component: ClientComponent,
    }, {
      path: ':id',
      component: ClientEditComponent,
    }]
  },
  {
    path: 'project',
    children: [{
      path: '',
      component: ProjectComponent,
    }, {
      path: ':id',
      component: ProjectEditComponent,
    }]
  },
  {
    path: 'task',
    children: [{
      path: '',
      component: TaskComponent,
    }, {
      path: ':id',
      component: TaskEditComponent,
    }]
  },
  {
    path: 'calendar',
    children: [{
      path: 'my-calendar',
      component: PersonalCalendarComponent
    }, {
      path: 'company-calendar',
      component: CompanyCalendarComponent
    }]
  },
  {
    path: 'list',
    component: ListComponent,
  },
  {
    path: 'report',
    component: ReportComponent,
  }
]

@NgModule({
  declarations: [
    ClientComponent,
    ProjectComponent,
    TaskComponent,
    ClientEditComponent,
    ProjectEditComponent,
    TaskEditComponent,
    PersonalCalendarComponent,
    CompanyCalendarComponent,
    CheckInModalComponent,
    ReportComponent,
    WhosInComponent,
    AddManualCheckModalComponent,
    ListComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgxDatatableModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    ArchwizardModule,
    DragDropModule,
    FullCalendarModule,
    LayoutModule,
    NgApexchartsModule,
    NgbDatepickerModule,
    NgbTooltipModule,
    NgbTimepickerModule,
  ],
  providers: [
    FormBuilder,
  ],
  exports: [
    WhosInComponent,
  ]
})
export class TimeTrackingContextModule {
}
