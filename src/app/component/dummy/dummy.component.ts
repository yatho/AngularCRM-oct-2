import {
  Component,
  EventEmitter,
  input,
  Input,
  output,
  Output,
} from '@angular/core';

@Component({
  selector: 'crm-dummy',
  templateUrl: './dummy.component.html',
  styleUrl: './dummy.component.css',
})
export class DummyComponent {
  @Input({
    required: true,
  })
  public label = '';
  @Output()
  public toto = new EventEmitter<string>();

  onClicked(): void {
    this.toto.emit(this.label + 'a random string');
  }

  // public label = input.required<string>();
  // public toto = output<string>();

  // onClicked(): void {
  //   this.toto.emit(this.label() + 'a random string');
  // }
}
