import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private urlApi = environment.url;

  constructor(private http: HttpClient) {}

  login(user, method: string) {
    return this.http.post<any>(this.urlApi + method, user).pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError(err.error.message);
      })
    );
  }
}
