import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { BaseService } from 'src/app/core/base/base.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { User } from '../user/service/user.object';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  form: FormGroup;
  message: string;
  nameButton: string;
  validEmail: boolean;
  showLogin: boolean;
  email = new FormControl('', [Validators.required, Validators.email]);

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private route: Router,
    private baseService: BaseService
  ) {
    this.buildForm();
    this.message = null;
    this.showLogin = true;
    this.nameButton = 'Siguiente';
    this.validEmail = false;
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  // Valida si se va hacer un logueo o si se va a validar el email.
  validateAction() {
    !this.validEmail ? this.validateEmail() : this.login();
  }

  validateEmail() {
    this.baseService
      .getAny('user/validateEmail', this.form.get('email').value)
      .subscribe(
        (res: boolean) => {
          if (!res) {
            this.message =
              'Enviamos un email a tu correo donde puedes crear tu contraseña';
            this.nameButton = 'Reenviar';
          } else {
            this.nameButton = 'Iniciar sesion';
            this.validEmail = true;
            this.form.addControl(
              'password',
              new FormControl('', Validators.required)
            );
          }
        },
        (error) => {
          this.message = error.error.message;
        }
      );
  }

  login() {
    this.authService.login(this.form.value, 'auth/login').subscribe(
      () => {
        this.route.navigate(['./user']);
      },
      (error) => {
        this.message = error;
      }
    );
  }

  validateStateLogin() {
    this.showLogin ? (this.showLogin = false) : (this.showLogin = true);
    this.form.reset();
    this.email.reset();
  }

  sendEmail() {
    this.baseService
      .create('user/forgetpassword', { email: this.email.value })
      .subscribe(() => {});
  }
}
