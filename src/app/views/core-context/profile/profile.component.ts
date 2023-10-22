import {Component, OnInit} from '@angular/core';
import {MyHoursReportModel} from "../../../core/models/my-hours-report.model";
import {CheckReportApiService} from "../../../core/services/check-report.api.service";
import {UserService} from "../../../core/services/user.service";
import {User} from "../../../core/models/user.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import Swal from "sweetalert2";
import {UserApiService} from "../../../core/services/user.api.service";
import {SubscriptionApiService} from "../../../core/services/subscription.api.service";
import {CompanyApiService} from "../../../core/services/company.api.service";
import {CompanyResponse} from "../../../core/models/company.model";
import {AddressApiService} from "../../../core/services/address.api.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

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
  addressForm: FormGroup;
  addressEntity: any;

  constructor(
    private checkReportApiService: CheckReportApiService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private userApiService: UserApiService,
    private addressApiService: AddressApiService
  ) {
  }

  ngOnInit(): void {
    this.userService.getUserEntity().subscribe((user) => {
      if (user) {
        this.user = user;
        this.formGroup = this.formBuilder.group({
          name: [user.name, Validators.required],
          surname: [user.surname, Validators.required],
        });
        this.addressForm = this.formBuilder.group({
          address: ['', Validators.required],
          city: ['', Validators.required],
          county: ['', Validators.required],
          country: ['', Validators.required],
          postcode: ['', Validators.required],
          resource_id: [this.user.company_id, Validators.required],
          type: 'COMPANY',
        });
        this.userService.getAddress().subscribe((address) => {
          console.log(address);
          this.addressForm.patchValue(address);
        });
        this.loading = false;
      }
    });
  }



  onSubmit(): void {
    let _updatedValues = this.formGroup.value;
    const userObject = {...this.user, ..._updatedValues};
    this.userApiService.update(this.user.id, userObject).subscribe(res => {
      this.userService.setUserEntity(userObject);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Updated your details successfully"
      });
    });
  }

  onSubmitAddressForm() {
    const entity: any = {...this.addressEntity, ...this.addressForm.value};
    if (!this.addressEntity) {
      this.addressApiService.create(entity).subscribe(() => {});
    } else {
      this.addressApiService.update(entity.id, entity).subscribe(() => {});
    }
  }

  updatePassword(): void {
    this.userApiService.updateUserPassword(this.user.id, this.password).subscribe(res => {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Password updated correctly",
      });
    });
  }

  public pipeHours(seconds: string): string {
    return Math.round(parseInt(seconds) / 3600).toString();
  }

}
