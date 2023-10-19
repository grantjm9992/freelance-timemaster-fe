import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user/user.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import {RouterModule, Routes} from "@angular/router";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgSelectModule} from "@ng-select/ng-select";
import { ProfileComponent } from './profile/profile.component';
import {FeatherIconModule} from "../../core/feather-icon/feather-icon.module";
import {NgApexchartsModule} from "ng-apexcharts";
import {NgbTimepickerModule} from "@ng-bootstrap/ng-bootstrap";
import {LayoutModule} from "../layout/layout.module";
import { CompanyComponent } from './company/company.component';

const routes: Routes = [{
  path: 'user',
  children: [{
    path: '',
    component: UserComponent,
  }, {
    path: ':id',
    component: UserEditComponent,
  }]
}, {
  path: 'profile',
  component: ProfileComponent,
}, {
  path: 'company',
  component: CompanyComponent,
}]

@NgModule({
  declarations: [
    UserComponent,
    UserEditComponent,
    ProfileComponent,
    CompanyComponent,
  ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        NgxDatatableModule,
        FormsModule,
        ReactiveFormsModule,
        NgSelectModule,
        FeatherIconModule,
        NgApexchartsModule,
        NgbTimepickerModule,
        LayoutModule,
    ]
})
export class CoreContextModule { }
