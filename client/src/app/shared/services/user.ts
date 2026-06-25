import { inject, Injectable } from '@angular/core';
import { Api } from './api';
import { map, Observable, shareReplay } from 'rxjs';
import { ApiResponse, IUser } from '../interfaces';
import { Constant } from '../../utility/constant';
import { USER_FILTER } from '../interfaces/user';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class User {
  private api = inject(Api);
  private assignableUsers$: Observable<IUser[]> | null = null;

  public create(data: IUser): Observable<ApiResponse<IUser>> {
    return this.api.post<ApiResponse<IUser>>(Constant.CREATE_USER, data)
  }

  public update(id: string, data: IUser): Observable<ApiResponse<IUser>> {
    return this.api.patch<ApiResponse<IUser>>(`${Constant.UPDATE_USER}${id}`, data)
  }

  public meProfile(): Observable<ApiResponse<IUser>> {
    return this.api.get<ApiResponse<IUser>>(`${Constant.USER_ME}`)
  }

  public userList(filter: USER_FILTER): Observable<IUser[]> {
    const params = new HttpParams().append('role', filter);
    return this.api.get<ApiResponse<IUser[]>>(`${Constant.USER_LIST}`, params).pipe(map(response => response.data))
  }

  public delete(id: string): Observable<ApiResponse<IUser>> {
    return this.api.delete<ApiResponse<IUser>>(`${Constant.DELETE_USER}${id}`)
  }

  public assignableUsers(): Observable<IUser[]> {
    if (!this.assignableUsers$) {
      this.assignableUsers$ = this.api.get<ApiResponse<IUser[]>>(`${Constant.ASSIGNABLE_USER}`).pipe(
        map((response : ApiResponse<IUser[]>) => response.data),
        shareReplay(1)
      );
    }
    return this.assignableUsers$;
  }

  public clearAssignableUsersCache(): void {
    this.assignableUsers$ = null;
  }
}
