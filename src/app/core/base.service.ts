import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
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
}
