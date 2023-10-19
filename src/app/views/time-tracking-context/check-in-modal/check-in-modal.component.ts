import { Component, OnInit } from '@angular/core';
import {TaskApiService} from "../../../core/services/task.api.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {retinaScale} from "chart.js/helpers";

@Component({
  selector: 'app-check-in-modal',
  templateUrl: './check-in-modal.component.html',
  styleUrls: ['./check-in-modal.component.scss']
})
export class CheckInModalComponent implements OnInit {

  public onSubmit: (eventName: string) => void;
  public tasks: any = [];
  public form: FormGroup;
  private formSubmitAttempt: boolean;

  constructor(
    private taskApiService: TaskApiService,
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      task_id: [null, Validators.required]
    });
    this.taskApiService.getAll().subscribe(res => {
      this.tasks = res.data;
    })
  }

  submitForm() {
    this.formSubmitAttempt = true;
    console.log(this.form.get('task_id')?.errors);
    if (this.form.valid) {
      if (this.onSubmit) {
        this.onSubmit(this.form.value);
        this.activeModal.dismiss();
      }
    }
  }

  isFieldValid(field: string) {
    if (this.form) {
      const _field = this.form.get(field);
      if (_field === null) {
        return true;
      }
      return (
        (!_field.valid && _field.touched) ||
        (_field.untouched && this.formSubmitAttempt)
      );
    }
    return true;
  }

  displayFieldCss(field: string) {
    return {
      'has-error': this.isFieldValid(field),
      'has-feedback': this.isFieldValid(field)
    };
  }

}
