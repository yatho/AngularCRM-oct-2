import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'crm-help',
  templateUrl: './help.component.html',
  styleUrl: './help.component.css',
})
export class HelpComponent {
  @Input()
  field?: AbstractControl;

  @Input()
  errorMessages?: { [key: string]: string };

  constructor() {}

  ngOnInit(): void {}

  isError(): boolean {
    return !!this.field && this.field.touched && !this.field.valid;
  }

  get errors(): string[] {
    return Object.keys(this.field?.errors as object)
      .map((key) => {
        return this.errorMessages?.[key]
          ? this.errorMessages?.[key]
          : `Missing message for ${key}`;
      })
      .slice(0, 1);
  }
}
