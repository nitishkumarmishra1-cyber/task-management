import { inject, Injectable } from '@angular/core';
import { Api } from './api';
import { Observable, shareReplay } from 'rxjs';
import { ApiResponse, IUser } from '../interfaces';
import { Constant } from '../../utility/constant';
import { USER_FILTER } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class User {
  private api = inject(Api);

  public create(data: IUser): Observable<ApiResponse<IUser>> {
    return this.api.post<ApiResponse<IUser>>(Constant.CREATE_USER, data)
  }

  public update(id: string, data: IUser): Observable<ApiResponse<IUser>> {
    return this.api.patch<ApiResponse<IUser>>(`${Constant.UPDATE_USER}${id}`, data)
  }

  public meProfile(): Observable<ApiResponse<IUser>> {
    return this.api.get<ApiResponse<IUser>>(`${Constant.USER_ME}`)
  }

  public userList(filter : USER_FILTER): Observable<ApiResponse<IUser[]>> {
    return this.api.get<ApiResponse<IUser[]>>(`${Constant.USER_LIST}?role=${filter}`)
  }

  public delete(id: string): Observable<ApiResponse<IUser>> {
    return this.api.delete<ApiResponse<IUser>>(`${Constant.DELETE_USER}${id}`)
  }

  public assignableUsers(): Observable<ApiResponse<IUser[]>> {
    return this.api.get<ApiResponse<IUser[]>>(`${Constant.ASSIGNABLE_USER}`).pipe(shareReplay(1))
  }
}
