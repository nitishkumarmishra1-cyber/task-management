import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class Api {
  private httpClient : HttpClient = inject(HttpClient)

  public post<T>(url : string, data : any) : Observable<T> {
    return this.httpClient.post<T>(`${environment.BASE_URL}${url}`, data, { withCredentials : true });
  }

  public get<T>(url: string, params : HttpParams = new HttpParams()) : Observable<T> {
    return this.httpClient.get<T>(`${environment.BASE_URL}${url}`, { params, withCredentials : true });
  }

  public patch<T>(url : string, data : any) : Observable<T> {
    return this.httpClient.patch<T>(`${environment.BASE_URL}${url}`, data, { withCredentials : true });
  }

  public delete<T>(url : string)  : Observable<T> {
    return this.httpClient.delete<T>(`${environment.BASE_URL}${url}`, { withCredentials : true });
  }
}
