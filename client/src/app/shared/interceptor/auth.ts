import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Auth } from '../services/auth';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SocketService } from '../services/socket';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(Auth)
  const router = inject(Router);
  const dialog = inject(MatDialog);
  const socket = inject(SocketService);

  const updateRequest = req.clone({
    setHeaders: {
      Authorization: `Bearer ${auth.user?.accessToken}`
    }
  });

  return next(updateRequest).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && !updateRequest.url.includes('login')) {
        dialog.closeAll();
        socket.disconnect();
        router.navigateByUrl('/auth/login');
      }

      return throwError(() => error);
    })
  );
};