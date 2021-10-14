import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor() {}

  // Guarda el token en localstorage
  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  // Obtiene el token del localstorage
  getToken() {
    return localStorage.getItem('token');
  }

  // Elimina el token para cerrar la sesion.
  deleteToken() {
    return localStorage.removeItem('token');
  }
}
