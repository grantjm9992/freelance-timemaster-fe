import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TaskApiService} from "../../../core/services/task.api.service";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {date} from "ngx-custom-validators/src/app/date/validator";

@Component({
  selector: 'app-add-manual-check-modal',
  templateUrl: './add-manual-check-modal.component.html',
  styleUrls: ['./add-manual-check-modal.component.scss']
})
export class AddManualCheckModalComponent implements OnInit {

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
      task_id: [null, Validators.required],
      date_start: [null, Validators.required],
      time_start: [{hour: 8, minute: 0, second: 0}, Validators.required],
      date_end: [null, Validators.required],
      time_end: [{hour: 17, minute: 0, second: 0}, [Validators.required]],
    });
    this.taskApiService.getAll().subscribe(res => {
      this.tasks = res.data;
    })
  }

  submitForm() {
    this.formSubmitAttempt = true;
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
