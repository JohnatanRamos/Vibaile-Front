import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { AdminRoutingModule } from './admin.routing.module';

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, AdminRoutingModule],
})
export class AdminModule {}
