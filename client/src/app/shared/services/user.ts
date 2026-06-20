import { inject, Injectable } from '@angular/core';
import { Api } from './api';
import { Observable } from 'rxjs';
import { ApiResponse, IUser } from '../interfaces';
import { Constant } from '../../utility/constant';

@Injectable({
  providedIn: 'root',
})
export class User {
  private api = inject(Api);

  public create(data : IUser) : Observable<ApiResponse<IUser>> {
    return this.api.post<ApiResponse<IUser>>(Constant.CREATE_USER_URL, data)
  }

  public update(id : string, data : IUser) : Observable<ApiResponse<IUser>> {
    return this.api.patch<ApiResponse<IUser>>(`${Constant.USER_PATCH}${id}`, data)
  }

  public meProfile() : Observable<ApiResponse<IUser>> {
    return this.api.get<ApiResponse<IUser>>(`${Constant.USER_ME}`)
  }

  public userList() : Observable<ApiResponse<IUser[]>> {
    return this.api.get<ApiResponse<IUser[]>>(`${Constant.USER_LIST}`)
  }

  public delete(id : string) : Observable<ApiResponse<IUser[]>> {
    return this.api.delete<ApiResponse<IUser[]>>(`${Constant.DELETE_USER}${id}`)
  }
}
