import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  private urlApi = environment.url;

  constructor(private http: HttpClient) {}

  getAll(method: string) {
    return this.http.get(this.urlApi + method);
  }

  getAny(method: string, data: any) {
    return this.http.get(this.urlApi + method + '/' + data);
  }

  create(method: string, data: any) {
    return this.http.post(this.urlApi + method, data);
  }

  delete(method: string, id: number) {
    return this.http.delete(this.urlApi + method + '/' + id);
  }

  update(method: string, id: number, data: any) {
    return this.http.patch(this.urlApi + method + '/' + id, data);
  }
}
