import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiResponse, IUser, ROLE, STATUS } from '@app/shared/interfaces/index';
import { MaterialModule } from '@app/shared/modules/material-module';
import { Auth } from '@app/shared/services/auth';
import { AlertService } from '@app/shared/services/snackbar';
import { User } from '@app/shared/services/user';
import { Constant } from '@app/utility/constant';

@Component({
  selector: 'app-create-update-user',
  standalone: true,
  imports: [
    MaterialModule,
    ReactiveFormsModule
  ],
  templateUrl: './create-update-user.html',
  styles: [`
    .w-100 { width: 100%; }
    .mb-2 { margin-bottom: 0.5rem; }
  `]
})
export class CreateUpdateUser implements OnInit {
  private auth = inject(Auth);
  private user = inject(User);
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<CreateUpdateUser>);
  public data: { user: IUser, assignableUsers: IUser[] } | any = inject<CreateUpdateUser>(MAT_DIALOG_DATA);
  private alert = inject(AlertService);

  userForm!: FormGroup;
  isEditMode = false;
  hidePassword = true;
  ROLE_OPTIONS = Constant.ROLE_OPTION(this.auth.user?.role as ROLE);
  isSubmitting = signal(false);
  isProfile = signal(false);

  ngOnInit(): void {
    this.isEditMode = !!this.data?.user;
    this.isProfile.set(this.data?.user?.id === this.auth.user?.id);

    this.initForm();

    // team lead can only report to manager to other employees
    this.userForm.get('role')?.valueChanges.subscribe((value: ROLE) => {
      if (value === ROLE.TEAM_LEAD) {
        this.userForm.get('reportTo')?.setValue(this.auth.user?.id);
        this.userForm.get('reportTo')?.disable();
      } else {
        this.userForm.get('reportTo')?.enable();
      }
    })
  }

  private initForm(): void {
    this.userForm = this.fb.group({
      name: [
        this.data?.user?.name || '',
        [Validators.required, Validators.minLength(2), Validators.maxLength(50)]
      ],
      email: [
        this.data?.user?.email || '',
        [Validators.required, Validators.email, Validators.pattern(Constant.EMAIL_PATTERN)]
      ],
      role: [
        this.data?.user?.role || ROLE.USER,
        [Validators.required]
      ],
      reportTo: [
        { value : this.data?.user?.reportTo?.id || '', disabled : this.data?.user?.role === ROLE.TEAM_LEAD },
        [Validators.required]
      ],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(Constant.PASSSWORD_PATTERN)]]
    });

    // remove validators from password we don't need when updating
    if (this.isEditMode) {
      this.userForm.get('password')?.clearValidators();
    }

    // we cannot update this because when user updating profile he should update these things
    if (this.isProfile()) {
      this.userForm.get('role')?.clearValidators();
      this.userForm.get('reportTo')?.clearValidators();
    }
  }

  get name() { return this.userForm.get('name'); }
  get email() { return this.userForm.get('email'); }
  get password() { return this.userForm.get('password'); }


  onSubmit(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);
    const payload = { ...this.userForm.getRawValue() };

    let $performAction = this.user.create(payload);
    if (this.isEditMode) {
      if (this.isProfile()) {
      this.userForm.get('role')?.clearValidators();
      this.userForm.get('reportTo')?.clearValidators();
    }


      delete payload.password;
      $performAction = this.user.update(this.data?.user?.id, payload)
    }

    $performAction.subscribe({
      next: (response: ApiResponse<IUser>) => {
        this.alert.success(response.message);
        this.dialogRef.close(true);
      },
      error: (error: HttpErrorResponse) => {
        this.isSubmitting.set(false);
        this.alert.error(error.error.message);
      }
    })
  }

  onCancel(): void {
    this.dialogRef.close(null);
  }
}