import { MatDialog } from '@angular/material/dialog';
import { BaseService } from './base.service';

export class BaseModalComponent {
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

  openModal(modal) {
    const dialogRef = this.modalService.open(modal, {
      height: '500px',
      width: '400px',
      disableClose: true,
    });
    return dialogRef;
  }

  changePage(event) {
    console.log(event);
  }
}
