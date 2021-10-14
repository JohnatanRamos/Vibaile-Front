import { MatDialog } from '@angular/material/dialog';
import { BaseService } from './base.service';

export class BaseComponent {
  numberRecords: number;
  page: number;
  totalRecords: number;

  constructor(
    private modalService: MatDialog,
    private baseService: BaseService
  ) {}

  closeModal() {
    this.modalService.closeAll();
  }

  openModal(modal, data = null) {
    const dialogRef = this.modalService.open(modal, {
      height: '500px',
      width: '400px',
      disableClose: true,
      data: data,
    });
    return dialogRef;
  }

  changePage(event) {
    console.log(event);
  }
}
