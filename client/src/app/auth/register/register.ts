import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from '../../shared/modules/material-module';
import { passwordsMatchValidator } from '../customValidator';

@Component({
  selector: 'app-register',
  imports: [MaterialModule, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private fb: FormBuilder = inject(FormBuilder)
  registerForm: FormGroup;
  hidePassword = true;
  hideConfirmPassword = true;
  isSubmitting = false;
  registerError: string = '';

  constructor() {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: passwordsMatchValidator });
  }

  get username() {
    return this.registerForm.get('username');
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
    this.registerError = '';

    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    const { username, email, password } = this.registerForm.value;

    // TODO: Replace with actual AuthService call once backend API is wired up
    // this.authService.register({ username, email, password }).subscribe({
    //   next: () => { /* redirect to login */ },
    //   error: (err) => { this.registerError = 'Registration failed. Email may already be in use.'; this.isSubmitting = false; }
    // });

    console.log('Register submitted:', { username, email, password });
    this.isSubmitting = false;
  }

}
