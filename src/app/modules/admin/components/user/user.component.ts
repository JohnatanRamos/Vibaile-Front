import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { zip } from 'rxjs';
import { map } from 'rxjs/operators';

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
    this.consultUsers();
  }

  modalOpen(item?: User) {
    if (item) {
      item.roleId = item.role.id;
    }
    this.openModal(UserModalComponent, item)
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.ngOnInit();
        }
      });
  }

  deleteUser(item: User) {
    this.serviceBase.delete('person', item.person.id).subscribe((res) => {
      this.consultUsers();
    });
  }

  consultUsers() {
    this.serviceBase.getAll('user').subscribe((res: User[]) => {
      this.listEntity = new MatTableDataSource<User>(res);
      this.listEntity.paginator = this.paginator;
      // this.totalRecords = this.listEntity.paginator.length;
    });
  }
}
