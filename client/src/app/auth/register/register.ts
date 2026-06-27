import { Component, DestroyRef, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from '../../shared/modules/material-module';
import { passwordsMatchValidator } from '../customValidator';
import { User } from '@app/shared/services/user';
import { ApiResponse, IUser } from '@app/shared/interfaces';
import { AlertService } from '@app/shared/services/snackbar';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-register',
  imports: [MaterialModule, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private user = inject(User)
  private fb: FormBuilder = inject(FormBuilder)
  private alert = inject(AlertService);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);

  registerForm: FormGroup;
  hidePassword = true;
  hideConfirmPassword = true;
  isSubmitting = signal(false);

  constructor() {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: passwordsMatchValidator });
  }

  get name() {
    return this.registerForm.get('name');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);

    this.user.create(this.registerForm.value).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (response: ApiResponse<IUser>) => {
        this.alert.success(response.message);
        this.router.navigateByUrl('/auth/login');
      },
      error: (error: HttpErrorResponse) => {
        this.isSubmitting.set(false);
        this.alert.error(error.error.message);
      }
    })
  }
}
