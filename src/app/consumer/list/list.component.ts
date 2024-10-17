import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ConsumerService } from '../consumer.service';

@Component({
  selector: 'crm-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
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
