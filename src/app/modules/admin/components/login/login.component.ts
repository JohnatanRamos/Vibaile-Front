import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  message: string;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private route: Router
  ) {
    this.buildForm();
    this.message = null;
  }

  ngOnInit(): void {}

  login() {
    this.authService.login(this.form.value, 'auth/login').subscribe(
      (res) => {
        this.route.navigate(['./user']);
      },
      (error) => {
        this.message = error;
      }
    );
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }
}
