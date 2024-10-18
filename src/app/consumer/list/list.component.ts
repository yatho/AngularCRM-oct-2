import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ConsumerService } from '../consumer.service';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import {
  MatTable,
  MatColumnDef,
  MatHeaderCellDef,
  MatHeaderCell,
  MatCellDef,
  MatCell,
  MatHeaderRowDef,
  MatHeaderRow,
  MatRowDef,
  MatRow,
} from '@angular/material/table';
import { MatFabButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { AsyncPipe } from '@angular/common';
import { PhonePipe } from '../../common/phone.pipe';

@Component({
  selector: 'crm-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
  imports: [
    MatFormField,
    MatLabel,
    MatInput,
    FormsModule,
    MatTable,
    MatColumnDef,
    MatHeaderCellDef,
    MatHeaderCell,
    MatCellDef,
    MatCell,
    MatFabButton,
    RouterLink,
    MatIcon,
    MatHeaderRowDef,
    MatHeaderRow,
    MatRowDef,
    MatRow,
    AsyncPipe,
    PhonePipe,
  ],
})
export class ListComponent {
  private consumerService = inject(ConsumerService);
  protected consumers$ = this.consumerService.getList();
  protected displayedColumns = ['id', 'name', 'email', 'phone', 'actions'];
  private destroyRef = inject(DestroyRef);

  protected filter: string = '';

  search(): void {
    this.consumers$ = this.consumerService.getList(this.filter);
  }

  remove(id: number): void {
    if (confirm(`Etes vous sur de supprimer l'entité ${id} ?`)) {
      this.consumerService
        .delete(id)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(() => {
          this.search();
        });
    }
  }
}
