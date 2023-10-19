import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthApiService} from "../../../../core/services/auth.api.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  error: any[] = [];
  constructor(private router: Router, private formBuilder: FormBuilder, private authApiService: AuthApiService) {
    this.form = formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', Validators.required],
      company_name: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.error = [];
    const value = this.form.value;
    this.authApiService.register(value).subscribe(res => {
      Swal.fire({
        icon: 'success',
        title: 'Registration successful',
        text: 'You have successfully registered, please check your email to verify your account',
      }).then(() => {
        this.router.navigate(['/auth/login']);
      });
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

}
