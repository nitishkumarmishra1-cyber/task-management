import { inject, Injectable } from '@angular/core';
import { ApiResponse, ITask } from '../interfaces';
import { Api } from './api';
import { map, Observable } from 'rxjs';
import { Constant } from '@app/utility/constant';
import { INotification } from '../interfaces/notification';

@Injectable({
  providedIn: 'root',
})
export class Notification {
  private api = inject(Api);

  public update(data : INotification) : Observable<ApiResponse<INotification>> {
    return this.api.patch<ApiResponse<INotification>>(`${Constant.UPDATE_NOTIFICATION}`, data)
  }

  public unseenCount() : Observable<number> {
    return this.api.get<ApiResponse<number>>(`${Constant.UNSEEN_COUNT_NOTIFICATION}`).pipe(map(response => response.data))
  }

  public allNotifications() : Observable<ApiResponse<INotification[]>> {
    return this.api.get<ApiResponse<INotification[]>>(`${Constant.GET_NOTIFICATION}`)
  }
}
