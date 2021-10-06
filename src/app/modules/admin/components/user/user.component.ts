import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { BaseModalComponent } from 'src/app/core/base/base-modal';
import { BaseService } from 'src/app/core/base/base.service';

import { UserModalComponent } from './modal/user-modal.component';
import { User } from './service/user.object';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent extends BaseModalComponent implements OnInit {
  displayedColumns: string[] = [
    'name',
    'lastName',
    'email',
    'phone',
    'rol',
    'createData',
    'options',
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  listEntity: MatTableDataSource<User>;

  constructor(private serviceBase: BaseService, private modal: MatDialog) {
    super(modal, serviceBase);
  }

  ngOnInit(): void {
    this.serviceBase.getAll('user').subscribe((res: User[]) => {
      this.listEntity = new MatTableDataSource<User>(res);
      this.listEntity.paginator = this.paginator;
      // this.totalRecords = this.listEntity.paginator.length;
    });
  }

  modalOpen() {
    this.openModal(UserModalComponent)
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.ngOnInit();
        }
      });
  }
}
