import { Component, DestroyRef, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from '../../shared/modules/material-module';
import { passwordsMatchValidator } from '../customValidator';
import { User } from '@app/shared/services/user';
import { ApiResponse, IUser } from '@app/shared/interfaces';
import { AlertService } from '@app/shared/services/snackbar';
import { Router, RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Constant } from '@app/utility/constant';

@Component({
  selector: 'app-register',
  imports: [MaterialModule, ReactiveFormsModule, RouterLink],
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
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(Constant.PASSSWORD_PATTERN)]],
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
    if (this.registerForm.invalid || this.isSubmitting()) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);

    this.user.register(this.registerForm.value).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
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
