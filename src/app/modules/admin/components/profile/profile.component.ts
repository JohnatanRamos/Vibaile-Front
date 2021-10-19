import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseService } from 'src/app/core/base/base.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { User } from '../user/service/user.object';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  form: FormGroup;
  user: User;

  constructor(
    private _formBuilder: FormBuilder,
    private authService: AuthService,
    private baseService: BaseService,
    private router: Router
  ) {
    this.buildForm();
  }

  ngOnInit() {
    setTimeout(() => {
      // Pedimos el usuario desde "user$", este almacena el usuario
      this.authService.user$.subscribe((res) => {
        console.log(res), (this.user = res);
      });
    }, 300);
  }

  private buildForm() {
    this.form = this._formBuilder.group({
      currentPassword: ['', [Validators.required, Validators.minLength(13)]],
      newPassword: ['', [Validators.required, Validators.minLength(13)]],
      confirmNewPassword: ['', [Validators.required, Validators.minLength(13)]],
    });
  }

  confirmChangePassword() {
    if (
      this.form.get('newPassword').value ===
      this.form.get('confirmNewPassword').value
    ) {
      this.baseService
        .update('user/changePassword', this.user.id, this.form.value)
        .subscribe(() => {
          this.router.navigate(['./login']);
          this.authService.logout();
        });
    } else {
      alert('Las contraseñas no coinciden');
    }
  }
}
