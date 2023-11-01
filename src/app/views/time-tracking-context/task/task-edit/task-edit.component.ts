import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ProjectApiService} from "../../../../core/services/project.api.service";
import {TaskApiService} from "../../../../core/services/task.api.service";
import {LoadingService} from "../../../../core/services/loading.service";

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.scss']
})
export class TaskEditComponent implements OnInit {
  error: any[] = [];
  form: FormGroup;
  entity: any;
  id: string|null = null;
  public projects: any[] = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private apiService: TaskApiService,
    private formBuilder: FormBuilder,
    private projectApiService: ProjectApiService,
    private loadingService: LoadingService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      project_id: [null, Validators.required],
    });
    this.projectApiService.getAll().subscribe(res => {
      this.projects = res.data;
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
        this.loadingService.setLoading(false);
        this.router.navigate(['/time-tracking/task']);
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
      return;
    }
    this.apiService.update(this.entity.id, entity).subscribe(() => {
      this.loadingService.setLoading(false);
      this.router.navigate(['/time-tracking/task']);
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
      this.router.navigate(['/time-tracking/task']);
    });
  }
}
