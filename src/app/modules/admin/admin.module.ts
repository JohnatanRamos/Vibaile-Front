import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { AdminRoutingModule } from './admin.routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { UserComponent } from './components/user/user.component';
import { MaterialModule } from '../../shared/material/material.module';
import { UserModalComponent } from './components/user/modal/user-modal.component';

@NgModule({
  declarations: [LoginComponent, UserComponent, UserModalComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  entryComponents: [UserComponent],
})
export class AdminModule {}
