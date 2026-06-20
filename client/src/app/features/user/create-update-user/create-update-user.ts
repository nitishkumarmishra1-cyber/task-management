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
  public data : { user : IUser, assignableUsers : IUser[] } | any = inject<CreateUpdateUser>(MAT_DIALOG_DATA);
  private alert = inject(AlertService);

  userForm!: FormGroup;
  isEditMode = false;
  hidePassword = false;
  ROLE_OPTIONS = Constant.ROLE_OPTIONS;
  isSubmitting = signal(false);

  ngOnInit(): void {
    this.isEditMode = !!this.data?.user;
    this.initForm();

    // team lead can only report to manager to other employees
    this.userForm.get('role')?.valueChanges.subscribe((value : ROLE) => {
      if(value === ROLE.TEAM_LEAD) {
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
        [Validators.required, Validators.minLength(3)]
      ],
      email: [
        this.data?.user?.email || '',
       [Validators.required, Validators.email]
      ],
      role: [
        this.data?.user?.role || ROLE.USER,
        [Validators.required, Validators.maxLength(500)]
      ],
      reportTo: [
        this.data?.user?.reportTo || '',
        [Validators.required]
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get name() { return this.userForm.get('name'); }
  get email() { return this.userForm.get('email'); }
  get password() { return this.userForm.get('password'); }


  onSubmit(): void {
    if(this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);
    const payload = { ...this.userForm.value };

    let $performAction = this.user.create(payload);
    if(this.isEditMode) {
      $performAction = this.user.update(this.data?.task?.id, payload)
    }

    $performAction.subscribe({
      next: (response: ApiResponse<IUser>) => {
        this.alert.success(response.message);
        this.dialogRef.close(response.data)
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