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

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  message: string;
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
  }

  ngOnInit(): void {}

  private buildForm() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
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
