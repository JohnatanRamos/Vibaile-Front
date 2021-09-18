import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private urlApi = environment.url;

  constructor(private http: HttpClient) {}

  login(user, method: string) {
    return this.http.get('http://localhost:3000/user/11');
  }
}
