import { inject, Injectable, signal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ILogin, IUser, ROLE } from '../interfaces/user';
import { Api } from './api';
import { Constant } from '../../utility/constant';
import { ApiResponse } from '../interfaces';
import { Router } from '@angular/router';
import { AlertService } from './snackbar';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private user$ = new BehaviorSubject<IUser | null>(null);
  private api: Api = inject(Api)
  private readonly savedKey = signal(btoa(Constant.USER_STORE_KEY));
  private router: Router = inject(Router);
  private alert: AlertService = inject(AlertService);

  public set update(user: IUser) {
    sessionStorage.setItem(this.savedKey(), btoa(JSON.stringify(user)));
    this.user$.next(user)
  }

  public get isAuthenticated(): boolean {
    return !!this.user
  }

  public get isAdmin(): boolean {
    return this.isAuthenticated && this.user?.role === ROLE.MANAGER
  }

  public get user(): IUser | null {
    return this.user$.value
  }

  public login(data: ILogin): Observable<ApiResponse<IUser>> {
    return this.api.post<ApiResponse<IUser>>(Constant.LOGIN, data)
  }

  public logout(): void {
    this.api.post<ApiResponse<IUser>>(Constant.LOGOUT, {}).subscribe({
      next: () => {
        this.alert.success(`Logged out successfully!`);
        this.handleCleanupAndNavigate();
      },
      error: (error: HttpErrorResponse) => {
        this.alert.success(error.error.message);
      }
    })
  }

  public checkSession(): boolean {
    if (this.isAuthenticated) return true;

    const storageKey = this.savedKey();
    const storedUser = sessionStorage.getItem(storageKey);

    if (!storedUser) {
      return false
    }

    try {
      this.update = JSON.parse(atob(storedUser));
      return true;
    } catch (error) {
      return false;
    }
  }

  private handleCleanupAndNavigate(): void {
    const storageKey = this.savedKey();
    sessionStorage.removeItem(storageKey);
    this.user$.next(null);

    setTimeout(() => {
      this.router.navigateByUrl('/auth/login');
    }, 100);
  }
}