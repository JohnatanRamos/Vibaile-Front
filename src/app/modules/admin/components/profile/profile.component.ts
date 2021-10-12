import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { User } from '../user/service/user.object';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  form: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.buildForm();
  }

  ngOnInit() {
    setTimeout(() => {
      // Pedimos el usuario desde "user$", este almacena el usuario
      this.authService.user$.subscribe((res) => console.log(res));
    }, 300);
  }

  private buildForm() {
    this.form = this._formBuilder.group({
      currentPassword: ['', [Validators.required, Validators.minLength(13)]],
      NewPassword: ['', [Validators.required, Validators.minLength(13)]],
      confirmNewPassword: ['', [Validators.required, Validators.minLength(13)]],
    });
  }

  savePassword() {
    console.log(this.form.value);
  }
}
