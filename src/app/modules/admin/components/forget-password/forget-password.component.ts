import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseService } from 'src/app/core/base/base.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss'],
})
export class ForgetPasswordComponent implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private activatedroute: ActivatedRoute,
    private baseService: BaseService,
    private router: Router
  ) {
    this.buildForm();
  }

  ngOnInit(): void {}

  private buildForm() {
    this.form = this.formBuilder.group({
      newPassword: ['', [Validators.required, Validators.minLength(13)]],
      confirmNewPassword: ['', [Validators.required, Validators.minLength(13)]],
    });
  }

  changePassword() {
    if (
      this.form.get('newPassword').value ===
      this.form.get('confirmNewPassword').value
    ) {
      const obj = {
        token: this.activatedroute.snapshot.params['id'],
        newPassword: this.form.get('newPassword').value,
      };
      this.baseService
        .create('user/changeforgetpassword', obj)
        .subscribe((res) => this.router.navigate(['./login']));
    } else {
      alert('Las contraseñas no coinciden');
    }
  }
}
