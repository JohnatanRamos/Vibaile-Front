import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { AdminRoutingModule } from './admin.routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, AdminRoutingModule, ReactiveFormsModule],
})
export class AdminModule {}
