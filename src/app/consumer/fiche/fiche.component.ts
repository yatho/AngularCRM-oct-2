import { Component, DestroyRef, effect, inject, input } from '@angular/core';
import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Consumer, ConsumerService } from '../consumer.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';

@Component({
    selector: 'crm-fiche',
    templateUrl: './fiche.component.html',
    styleUrl: './fiche.component.css',
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        MatFormField,
        MatLabel,
        MatSelect,
        MatOption,
        MatInput,
        MatButton,
    ],
})
export class FicheComponent {
  private consumerService = inject(ConsumerService);
  private destroyRef = inject(DestroyRef);
  private location = inject(Location);

  public id = input<number>();

  protected consumerForm = new FormGroup({
    civility: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    firstname: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    lastname: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    phone: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
      nonNullable: true,
    }),
  });

  constructor() {
    effect(() => {
      if (!!this.id()) {
        this.consumerService
          .get(this.id()!)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe((consumer) => {
            this.consumerForm.patchValue(consumer);
          });
      }
    });
  }

  onSubmit(): void {
    if (this.consumerForm.invalid) return;

    const newConsumersValue = this.consumerForm.getRawValue();
    let obs: Observable<Consumer>;
    if (!!this.id()) {
      obs = this.consumerService.update({
        ...newConsumersValue,
        id: this.id(),
      });
    } else {
      obs = this.consumerService.create(newConsumersValue);
    }
    obs.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.location.back();
    });
  }

  cancel(): void {
    this.location.back();
  }
}
