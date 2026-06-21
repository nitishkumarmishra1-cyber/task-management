import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from '../../shared/modules/material-module';
import { Auth } from '../../shared/services/auth';
import { ApiResponse, IUser } from '../../shared/interfaces';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertService } from '../../shared/services/snackbar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [MaterialModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private auth = inject(Auth);
  private fb: FormBuilder = inject(FormBuilder)
  private alert = inject(AlertService);
  private router = inject(Router);

  loginForm: FormGroup;
  hidePassword = true;
  isSubmitting = signal(false);

  constructor() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);
    const credentials = this.loginForm.value;

    this.auth.login(credentials).subscribe({
      next: (response: ApiResponse<IUser>) => {
        this.auth.update = response.data;
        this.alert.success(response.message);
        this.router.navigateByUrl('/task-management/tasks/my');
      },
      error: (error: HttpErrorResponse) => {
        this.isSubmitting.set(false);
        this.alert.error(error.error.message);
      }
    })
  }
}