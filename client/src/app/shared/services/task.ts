import { inject, Injectable } from '@angular/core';
import { ApiResponse, FILTER, ITask } from '../interfaces';
import { Api } from './api';
import { map, Observable } from 'rxjs';
import { Constant } from '@app/utility/constant';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Task {
  private api = inject(Api);

  public create(data: ITask): Observable<ApiResponse<ITask>> {
    return this.api.post<ApiResponse<ITask>>(Constant.CREATE_TASK, data)
  }

  public update(id: string, data: ITask): Observable<ApiResponse<ITask>> {
    return this.api.patch<ApiResponse<ITask>>(`${Constant.UPDATE_TASK}${id}`, data)
  }

  public taskList(taskType: string, filter: FILTER = FILTER.ALL): Observable<ITask[]> {
    const params = new HttpParams().append('filter', filter);
    const url = `${Constant.GET_TASK}${taskType === 'my' ? '' : `/${taskType}`}`;
    return this.api.get<ApiResponse<ITask[]>>(url, params).pipe(map(response => response.data))
  }

  public allTasks(): Observable<ApiResponse<ITask[]>> {
    return this.api.get<ApiResponse<ITask[]>>(`${Constant.ALL_TASK}`)
  }

  public delete(id: string): Observable<ApiResponse<ITask>> {
    return this.api.delete<ApiResponse<ITask>>(`${Constant.DELETE_TASK}${id}`)
  }

  public markTaskComplete(id: string): Observable<ApiResponse<ITask>> {
    return this.api.patch<ApiResponse<ITask>>(`${Constant.UPDATE_TASK_STATUS}${id}`, {})
  }
}
