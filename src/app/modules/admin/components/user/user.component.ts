import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { BaseService } from '../../../../core/base.service';
import { User } from './service/user.object';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'name',
    'lastName',
    'email',
    'phone',
    'rol',
    'createData',
  ];
  dataSource: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  listEntity: User[];

  constructor(private baseService: BaseService) {}

  ngOnInit(): void {
    this.baseService.getAll('user').subscribe((res: User[]) => {
      this.listEntity = res;
      console.log(res);
      this.dataSource = new MatTableDataSource<User>(this.listEntity);
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
