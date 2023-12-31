import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ClientApiService} from "../../../../core/services/client.api.service";
import {AddressApiService} from "../../../../core/services/address.api.service";
import Swal from "sweetalert2";
import {LoadingService} from "../../../../core/services/loading.service";

@Component({
  selector: 'app-client-edit',
  templateUrl: './client-edit.component.html',
  styleUrls: ['./client-edit.component.scss']
})
export class ClientEditComponent implements OnInit {
  error: any[] = [];
  form: FormGroup;
  addressForm: FormGroup;
  entity: any;
  addressEntity: any = null;
  id: string|null = null;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private apiService: ClientApiService,
    private formBuilder: FormBuilder,
    private addressApiService: AddressApiService,
    private loadingService: LoadingService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      tax_number: ['', Validators.required],
      invoce_prefix: ['', Validators.required],
    });
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.addressForm = this.formBuilder.group({
      address: ['', Validators.required],
      city: ['', Validators.required],
      county: ['', Validators.required],
      country: ['', Validators.required],
      postcode: ['', Validators.required],
      resource_id: [this.id, Validators.required],
      type: 'CLIENT',
    });
    if (this.id !== null && this.id !== 'new') {
      this.apiService.find(this.id).subscribe((response) => {
        this.entity = response.data;
        this.form.patchValue(response.data);
        if (response.data.address !== null) {
          this.addressEntity = response.data.address;
          this.addressForm.patchValue(this.addressEntity);
        }
      });
    }
  }

  onSubmitAddressForm() {
    const entity: any = {...this.addressEntity, ...this.addressForm.value};
    if (this.addressEntity === null) {
      this.addressApiService.create(entity).subscribe(() => {
        this.loadingService.setLoading(false);
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Address updated successfully',
        });
      }, () => {
        this.loadingService.setLoading(false);
      });
    } else {
      this.addressApiService.update(entity.id, entity).subscribe(() => {
        this.loadingService.setLoading(false);
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Address updated successfully',
        });
      });
    }
  }
  onSubmit() {
    this.error = [];
    const entity: any = { ...this.entity, ...this.form.value };
    if (this.id === 'new') {
      this.apiService.create(entity).subscribe((res) => {
        this.loadingService.setLoading(false);
        this.router.navigate([`/time-tracking/client`]);
      }, error => {
        this.loadingService.setLoading(false);
        if (error.status === 'error_subscription_needed') {
          Swal.fire({
            title: 'Subscription error',
            text: 'Without a subscription, you are limited to one client. Please upgrade your account to add more clients.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sign me up!',
            cancelButtonText: 'Cancel',
          }).then(() => {
            this.router.navigateByUrl('/general/pricing');
          });
        }
        if (error.status === 'error_subscription_inactive') {
          Swal.fire({
            title: 'Subscription error',
            text: 'Without a subscription, you are limited to one client. Please upgrade your account to add more clients.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sign me up!',
            cancelButtonText: 'Cancel',
          }).then(() => {
            this.router.navigateByUrl('/general/pricing');
          });
        }
        if (error.errors) {
          for (let key in error.errors) {
            error.errors[key].forEach((err: string) => {
              this.error.push(err);
            })
          }
        } else {
          this.error.push(error.message);
        }
        this.loadingService.setLoading(false);
      }, () => {
        this.loadingService.setLoading(false);
      });
      return;
    }
    this.apiService.update(this.entity.id, entity).subscribe(() => {
      this.loadingService.setLoading(false);
      this.router.navigate(['/time-tracking/client']);
    }, error => {
      this.loadingService.setLoading(false);
      if (error.errors) {
        for (let key in error.errors) {
          error.errors[key].forEach((err: string) => {
            this.error.push(err);
          })
        }
      } else {
        this.error.push(error.message);
      }
    });
  }

  delete() {
    this.apiService.remove(this.entity.id).subscribe(res => {
      this.loadingService.setLoading(false);
      this.router.navigate(['/time-tracking/client']);
    })
  }
}
