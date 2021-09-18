import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminModule } from './modules/admin/admin.module';
import { CoreModule } from '../app/core/core.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CoreModule,

    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,

    AdminModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
