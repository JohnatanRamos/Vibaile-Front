import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private urlApi = environment.url;

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  login(user, method: string) {
    return this.http.post<any>(this.urlApi + method, user).pipe(
      tap((response) => {
        this.tokenService.saveToken(response.access_token);
      }),
      catchError((err: HttpErrorResponse) => {
        return throwError(err.error.message);
      })
    );
  }
}
