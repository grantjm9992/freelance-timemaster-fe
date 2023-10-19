import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeatherIconModule } from '../../../core/feather-icon/feather-icon.module';

import { NgbAccordionModule, NgbDropdownModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

import { GeneralComponent } from './general.component';
import { BlankComponent } from './blank/blank.component';
import { FaqComponent } from './faq/faq.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { ProfileComponent } from './profile/profile.component';
import { PricingComponent } from './pricing/pricing.component';
import { TimelineComponent } from './timeline/timeline.component';
import { Routes, RouterModule } from '@angular/router';
import {NgxStripeModule} from "ngx-stripe";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { BuyComponent } from './pricing/buy/buy.component';
import {NgSelectModule} from "@ng-select/ng-select";
import {SweetAlert2Module} from "@sweetalert2/ngx-sweetalert2";

const routes: Routes = [
  {
    path: '',
    component: GeneralComponent,
    children: [
      {
        path: '',
        redirectTo: 'blank-page',
        pathMatch: 'full'
      },
      {
        path: 'blank-page',
        component: BlankComponent
      },
      {
        path: 'faq',
        component: FaqComponent
      },
      {
        path: 'invoice',
        component: InvoiceComponent
      },
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'pricing',
        children: [{
          path: '',
          component: PricingComponent,
        }, {
          path: 'buy/:type',
          component: BuyComponent,
        }]
      },
      {
        path: 'timeline',
        component: TimelineComponent
      }
    ]
  }
]

@NgModule({
  declarations: [GeneralComponent, BlankComponent, FaqComponent, InvoiceComponent, ProfileComponent, PricingComponent, TimelineComponent, BuyComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FeatherIconModule,
    NgbAccordionModule,
    NgbDropdownModule,
    FormsModule,
    ReactiveFormsModule,
    NgbTooltipModule,
    NgxStripeModule.forRoot('pk_live_PptJwF4w1zxvXjgMv2ZkqDaq'),
    NgSelectModule,
    SweetAlert2Module.forRoot()
  ]
})
export class GeneralModule { }
