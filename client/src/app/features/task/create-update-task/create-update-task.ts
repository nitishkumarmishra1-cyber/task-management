import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiResponse, ITask, IUser, STATUS } from '../../../shared/interfaces';
import { MaterialModule } from '../../../shared/modules/material-module';
import { Constant } from '@app/utility/constant';
import { Task } from '@app/shared/services/task';
import { AlertService } from '@app/shared/services/snackbar';
import { HttpErrorResponse } from '@angular/common/http';
import { Auth } from '@app/shared/services/auth';

@Component({
  selector: 'app-create-update-task',
  standalone: true,
  imports: [
    MaterialModule,
    ReactiveFormsModule
  ],
  templateUrl: './create-update-task.html',
  styles: [`
    .w-100 { width: 100%; }
    .mb-2 { margin-bottom: 0.5rem; }
  `]
})
export class CreateUpdateTask implements OnInit {
  private task = inject(Task);
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<CreateUpdateTask>);
  private alert = inject(AlertService);
  private auth = inject(Auth);
  public data : { task : ITask, canReassign : boolean, assignableUsers : IUser[] } | any = inject<CreateUpdateTask>(MAT_DIALOG_DATA);

  taskForm!: FormGroup;
  isEditMode = false;
  STATUS_OPTIONS = Constant.STATUS_OPTIONS;
  isSubmitting = signal(false);

  ngOnInit(): void {
    this.isEditMode = !!this.data?.task;
    this.initForm();
  }

  private initForm(): void {
    this.taskForm = this.fb.group({
      title: [
        this.data?.task?.title || '',
        [Validators.required, Validators.minLength(10), Validators.maxLength(100)]
      ],
      description: [
        this.data?.task?.description || '',
        [Validators.required, Validators.minLength(2), Validators.maxLength(500)]
      ],
      status: [
        this.data?.task?.status || STATUS.PENDING,
        [Validators.required]
      ],
      assignTo: [
        this.data?.task?.assignTo?.id ?? this.auth.user?.id,
        [Validators.required]
      ]
    });
  }

  get title() { return this.taskForm.get('title'); }
  get description() { return this.taskForm.get('description'); }

  onSubmit(): void {
    if(this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);
    const payload = { ...this.taskForm.value };

    let $performAction = this.task.create(payload);
    if(this.isEditMode) {
      $performAction = this.task.update(this.data?.task?.id, payload)
    }

    $performAction.subscribe({
      next: (response: ApiResponse<ITask>) => {
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