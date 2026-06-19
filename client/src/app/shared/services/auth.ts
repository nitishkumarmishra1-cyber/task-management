import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IUser } from '../interfaces/user';
import { Api } from './api';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private user$ = new BehaviorSubject<IUser | null>(null);
  private api = inject(Api);

  set update(user : IUser) {
    this.user$.next(user)
  }

  get user() : IUser | null {
    return this.user$.value
  }

  authenticate() {}

}
