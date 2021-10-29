import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/modules/admin/components/user/service/user.object';
import { AuthService } from '../services/auth/auth.service';
import { TokenService } from '../services/auth/token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const path = next.url[0].path;
    const token = this.tokenService.getToken();
    if (!token) {
      this.router.navigate(['/login']);
      return false;
    }
    if (path === 'user') {
      this.validateRole();
    }
    return true;
  }

  validateRole() {
    this.authService.user$.subscribe((res: User) => {
      debugger;
      if (res?.role?.name === 'Cliente') {
        this.router.navigate(['/profile']);
        return false;
      }
      debugger;
      return true;
    });
  }
}
