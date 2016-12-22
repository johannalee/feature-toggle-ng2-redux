import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { ICounter } from '../../store';

@Component({
  selector: 'rio-counter',
  template: `
    <div class="flex">
      <rio-button
      *featureId="id1"
      className="bg-black col-2"
      (onClick)="decrement.emit()"
      testid="counter-decrementButton">
      -
      </rio-button>

      <div
      data-testid="counter-result"
      class="flex-auto flex-center center h1">
      {{ counter.counter }}
      </div>

      <rio-button className="col-2"
      *featureId="id2"
      (onClick)="increment.emit()"
      testid="counter-incrementButton">
      +
      </rio-button>
    </div>

    <div class="flex">
      <rio-toggle
        [matchFeatureId]="id1"
        (onToggle)="decrementBtnOnChange($event)">
      </rio-toggle>

      <div class="flex-auto flex-center"></div>

      <rio-toggle
        [matchFeatureId]="id2"
        (onToggle)="incrementBtnOnChange($event)">
      </rio-toggle>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RioCounter {
  @Input() counter: ICounter;
  @Output() increment = new EventEmitter<void>();
  @Output() decrement = new EventEmitter<void>();
  @Output() onToggle = new EventEmitter<any>();

  id1: string = 'id1';
  id2: string = 'id2';

  private decrementBtnOnChange(event) {
    this.onToggle.emit({
      id: this.id1,
      visible: event.target.checked
    });
  }

  private incrementBtnOnChange(event) {
    this.onToggle.emit({
      id: this.id2,
      visible: event.target.checked
    });
  }
};
