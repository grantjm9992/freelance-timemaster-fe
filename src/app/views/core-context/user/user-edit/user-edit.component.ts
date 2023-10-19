import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ClientApiService} from "../../../../core/services/client.api.service";
import {UserApiService} from "../../../../core/services/user.api.service";
import {UserRole} from "../../../../core/data/user-role";

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  error: any[] = [];
  form: FormGroup;
  entity: any;
  id: string|null = null;

  public user_roles: any[];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private apiService: UserApiService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.user_roles = UserRole.userRoles;
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', Validators.required],
      user_role: [null, Validators.required],
    });
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.id !== null && this.id !== 'new') {
      this.apiService.find(this.id).subscribe((response) => {
        this.entity = response.data;
        this.form.patchValue(response.data);
      });
    }
  }

  onSubmit() {
    this.error = [];
    const entity: any = { ...this.entity, ...this.form.value };
    if (this.id === 'new') {
      this.apiService.create(entity).subscribe(() => {
        this.router.navigate(['/core/user']);
      }, error => {
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
      return;
    }
    this.apiService.update(this.entity.id, entity).subscribe(() => {
      this.router.navigate(['/core/user']);
    }, error => {
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
      this.router.navigate(['/core/user']);
    })
  }
}
