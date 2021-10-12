import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, throwError } from 'rxjs';

import { TokenService } from './token.service';
import { User } from 'src/app/modules/admin/components/user/service/user.object';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private urlApi = environment.url;
  private user = new BehaviorSubject<User | null>(null);

  // Para que los demas componentes se susbscriban.
  user$ = this.user.asObservable();

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  login(user, method: string) {
    return this.http.post<any>(this.urlApi + method, user).pipe(
      // Si todo sale bien, guardamos el token que nos devolvio la respuesta
      tap((response) => {
        this.tokenService.saveToken(response.access_token);
      }),
      // Si hay un error, enviamos solo el mensaje y lo capturamos en el subscribe que hizo esta peticion.
      catchError((err: HttpErrorResponse) => {
        return throwError(err.error.message);
      })
    );
  }

  getProfile() {
    // Hacemos la peticion y guardariamos la respuesta en "user$"
    return this.http
      .get(this.urlApi + 'user/profile')
      .pipe(tap((res: User) => this.user.next(res)));
  }
}
