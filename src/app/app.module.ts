import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminModule } from './modules/admin/admin.module';
import { CoreModule } from '../app/core/core.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { TokenInterceptor } from './core/interceptors/token.interceptor';
import { LayoutComponent } from './layout/layout.component';
import { SharedModule } from './shared/components/shared.module';

@NgModule({
  declarations: [AppComponent, LayoutComponent],
  imports: [
    CoreModule,

    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,

    AdminModule,
    SharedModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
