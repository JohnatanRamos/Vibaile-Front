import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UserComponent } from './components/user/user.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { LoginGuard } from 'src/app/core/guards/login.guard';

const routes: Routes = [
  {
    path: 'login',
    canActivate: [LoginGuard],
    component: LoginComponent,
  },
  {
    path: 'user',
    canActivate: [AuthGuard],
    component: UserComponent,
  },
  {
    path: 'profile',
    canActivate: [AuthGuard],
    component: ProfileComponent,
  },
  {
    path: 'newpassword/:id',
    component: ForgetPasswordComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
