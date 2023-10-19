import { Component, OnInit } from '@angular/core';
import Swal from "sweetalert2";
import {CheckReportApiService} from "../../../core/services/check-report.api.service";
import {UserService} from "../../../core/services/user.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserApiService} from "../../../core/services/user.api.service";
import {SubscriptionApiService} from "../../../core/services/subscription.api.service";
import {CompanyApiService} from "../../../core/services/company.api.service";
import {MyHoursReportModel} from "../../../core/models/my-hours-report.model";
import {User} from "../../../core/models/user.model";
import {CompanyResponse} from "../../../core/models/company.model";
import {CheckApproversApiService} from "../../../core/services/check-approvers.api.service";

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {

  public approvers: any[] = [];
  public loading: boolean = true;
  public subscription: any;
  public myHoursReport: MyHoursReportModel;
  public user: User;
  public users: any[];
  public company: any;
  password: any;
  error: any[] = [];
  formGroup: FormGroup;
  companyFormGroup: FormGroup;

  constructor(
    private checkReportApiService: CheckReportApiService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private userApiService: UserApiService,
    private subscriptionApiService: SubscriptionApiService,
    private companyApiService: CompanyApiService,
    private checkApproversApiService: CheckApproversApiService
  ) { }

  ngOnInit(): void {
    this.userService.getUserEntity().subscribe((user) => {
      if (user) {
        this.checkApproversApiService.getAll().subscribe(res => {
          this.users = res.data;
          this.approvers = this.users.filter(item => {
            return item.is_approver;
          })
        });
        this.companyApiService.getCompany(user.company_id).subscribe((res: CompanyResponse) => {
          this.company = res.data;
          this.companyFormGroup = this.formBuilder.group({
            configuration: this.formBuilder.group({
              auto_approve_checks: [null, Validators.required],
              auto_approve_manual_checks: [null, Validators.required],
              automatic_check_out_time: [null, Validators.required],
            }),
            name: ['', Validators.required],
          });
          this.companyFormGroup.patchValue(this.company);
          this.loading = false;
        });
      }
    });
  }

  submitCompanyConfiguration(): void {
    let _updatedCompanyConfig = this.companyFormGroup.value;
    const company = {...this.company, ..._updatedCompanyConfig};
    console.log(company);
    this.companyApiService.updateCompany(company.id, company).subscribe(() => {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Updated company details successfully"
      });
    });
  }


  private getTimeString(timeObject: any, seconds: boolean = false): string {
    let string = `${this.pad(timeObject.hour)}:${this.pad(timeObject.minute)}`;
    if (seconds) {
      string += `:${this.pad(timeObject.second)}`;
    }
    return string;
  }

  private pad(num:number, size: number = 2): string {
    let s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
  }

  public updateApprovers(): void {
    this.checkApproversApiService.updateForCompany(this.user.company_id, this.approvers).subscribe(res => {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Check approvers updated",
      });
    })
  }
}
