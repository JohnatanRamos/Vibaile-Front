import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { BaseModalComponent } from 'src/app/core/base/base-modal';
import { BaseService } from 'src/app/core/base/base.service';
import { User } from '../service/user.object';
import { UserComponent } from '../user.component';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.scss'],
})
export class UserModalComponent extends BaseModalComponent implements OnInit {
  form: FormGroup;
  listRole: Array<any>;

  constructor(
    private formBuilder: FormBuilder,
    private serviceBase: BaseService,
    readonly modal: MatDialog,
    private dialogRef: MatDialogRef<UserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User
  ) {
    super(modal, serviceBase);
    this.buildForm();
    if (this.data) {
      this.form.patchValue(this.data);
    }
  }

  ngOnInit(): void {
    this.getRoles();
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      email: [
        null,
        [Validators.required, Validators.email, Validators.maxLength(50)],
      ],
      roleId: [null, [Validators.required]],
      person: this.formBuilder.group({
        name: ['', [Validators.required, Validators.maxLength(60)]],
        lastName: ['', [Validators.required, Validators.maxLength(60)]],
        phone: ['', [Validators.maxLength(30)]],
      }),
    });
  }

  getRoles() {
    this.serviceBase.getAll('role').subscribe((res: any) => {
      this.listRole = res;
    });
  }

  // valida si va actualizar o crear.
  validateAction() {
    this.data ? this.updateUser() : this.createUser();
  }

  updateUser() {
    this.serviceBase
      .update('user', this.data.id, this.form.value)
      .subscribe(() => {
        this.dialogRef.close(true);
      });
  }

  createUser() {
    this.serviceBase.create('user', this.form.value).subscribe(() => {
      this.dialogRef.close(true);
    });
  }
}
