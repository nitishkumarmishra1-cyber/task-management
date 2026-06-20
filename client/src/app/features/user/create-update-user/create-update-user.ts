import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ITask, STATUS } from '@app/shared/interfaces/index';
import { MaterialModule } from '@app/shared/modules/material-module';

@Component({
  selector: 'app-create-update-task',
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
export class CreateUpdateTask implements OnInit {
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<CreateUpdateTask>);
  public data : { task : ITask } | any = inject<CreateUpdateTask>(MAT_DIALOG_DATA);

  taskForm!: FormGroup;
  isEditMode = false;
  statusEnum = STATUS; // Expose enum to template

  ngOnInit(): void {
    // If a task object was sent to the dialog, it means we are in edit mode
    this.isEditMode = !!this.data?.task;
    this.initForm();
  }

  private initForm(): void {
    // Pre-populate fields if editing; fall back to defaults if creating
    this.taskForm = this.fb.group({
      title: [
        this.data?.task?.title || '',
        [Validators.required, Validators.minLength(3)]
      ],
      description: [
        this.data?.task?.description || '',
        [Validators.required, Validators.maxLength(500)]
      ],
      status: [
        this.data?.task?.status || STATUS.PENDING,
        Validators.required
      ],
      assignedTo: [
        this.data?.task?.assignedTo || ''
      ]
    });
  }

  // Getters for cleaner field validation lookups in your HTML template
  get title() { return this.taskForm.get('title'); }
  get description() { return this.taskForm.get('description'); }

  onSubmit(): void {
    if (this.taskForm.valid) {
      // Send the updated form snapshot back to the parent list component
      this.dialogRef.close(this.taskForm.value);
    } else {
      this.taskForm.markAllAsTouched();
    }
  }

  onCancel(): void {
    this.dialogRef.close(null); // Return null to signify no changes were made
  }
}