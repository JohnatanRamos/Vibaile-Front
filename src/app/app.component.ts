import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from './core/services/auth/auth.service';
import { TokenService } from './core/services/auth/token.service';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'project';

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private authService: AuthService,
    private tokenService: TokenService
  ) {
    this.matIconRegistry.addSvgIcon(
      'plane',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/icons/avion-de-papel.svg'
      )
    );
  }

  ngOnInit() {
    // Agregamos esto para que cuando se refresque la pagina, pida el usuario
    // De esta manera solo lo pediriamos solo una vez, que seria cuando recargue la pagina.
    const token = this.tokenService.getToken();
    if (token) {
      this.authService.getProfile().subscribe();
    }
  }
}
