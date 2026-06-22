import { inject, Injectable } from '@angular/core';
import { ApiResponse, FILTER, ITask } from '../interfaces';
import { Api } from './api';
import { Observable } from 'rxjs';
import { Constant } from '@app/utility/constant';

@Injectable({
  providedIn: 'root',
})
export class Task {
  private api = inject(Api);

  public create(data : ITask) : Observable<ApiResponse<ITask>> {
    return this.api.post<ApiResponse<ITask>>(Constant.CREATE_TASK, data)
  }

  public update(id : string, data : ITask) : Observable<ApiResponse<ITask>> {
    return this.api.patch<ApiResponse<ITask>>(`${Constant.UPDATE_TASK}${id}`, data)
  }

  public taskList(taskType : string, filter : FILTER = FILTER.ALL) : Observable<ApiResponse<ITask[]>> {
    return this.api.get<ApiResponse<ITask[]>>(`${Constant.GET_TASK}${taskType === 'my' ? '' : `/${taskType}`}?filter=${filter}`)
  }

  public allTasks() : Observable<ApiResponse<ITask[]>> {
    return this.api.get<ApiResponse<ITask[]>>(`${Constant.ALL_TASK}`)
  }

  public delete(id : string) : Observable<ApiResponse<ITask>> {
    return this.api.delete<ApiResponse<ITask>>(`${Constant.DELETE_TASK}${id}`)
  }

  public markTaskComplete(id : string) : Observable<ApiResponse<ITask>> {
    return this.api.patch<ApiResponse<ITask>>(`${Constant.UPDATE_TASK_STATUS}${id}`, {})
  }
}
