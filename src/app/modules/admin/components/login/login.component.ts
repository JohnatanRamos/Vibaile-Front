import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {
    this.buildForm();
  }

  ngOnInit(): void {}

  login() {
    console.log(this.form.value);
    this.authService.login(this.form.value, 'login').subscribe((res) => {
      console.log(res);
    });
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }
}
