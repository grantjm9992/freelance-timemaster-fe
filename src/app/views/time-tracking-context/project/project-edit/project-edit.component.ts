import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ProjectApiService} from "../../../../core/services/project.api.service";
import {ClientApiService} from "../../../../core/services/client.api.service";

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.scss']
})
export class ProjectEditComponent implements OnInit {
  error: any[] = [];
  form: FormGroup;
  entity: any;
  id: string|null = null;
  public clients: any[] = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private apiService: ProjectApiService,
    private formBuilder: FormBuilder,
    private clientApiService: ClientApiService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      client_id: [null, Validators.required],
    });
    this.clientApiService.getAll().subscribe(res => {
      this.clients = res.data;
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
        this.router.navigate(['/time-tracking/project']);
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
      this.router.navigate(['/time-tracking/project']);
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
      this.router.navigate(['/time-tracking/project']);
    })
  }
}
