import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { TokenService } from '../services/auth/token.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private tokenService: TokenService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // El request va tener lo que retorne la funcion 'addToken'
    // Todo lo que pongamos antes de la linea 22, se va a ejecutar antes de enviar el request
    // Si ponemos algo despues de la linea 22 es porque va ser despues de recibir la respuesta del request que enviamos
    request = this.addToken(request);
    return next.handle(request);
  }

  private addToken(request: HttpRequest<unknown>) {
    const token = this.tokenService.getToken();
    if (token) {
      // Si hay un token, intercepta la peticion antes de ser enviada y modifica el header.
      const authReq = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${token}`),
      });
      return authReq;
    }
    // Si no hay un token, devuelve el request como estaba.
    return request;
  }
}
