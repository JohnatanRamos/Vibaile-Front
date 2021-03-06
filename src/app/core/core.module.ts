import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Services
import { AuthService } from './services/auth/auth.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [AuthService],
})
export class CoreModule {}
