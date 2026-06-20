import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class AlertService {
  private snackBar = inject(MatSnackBar);

  public success(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['success-snackbar']
    });
  }

  public error(message: string) {
    this.snackBar.open(message, 'Retry', {
      duration: 5000,
      panelClass: ['error-snackbar']
    });
  }
}