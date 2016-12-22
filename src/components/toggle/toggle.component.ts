import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit,
  ElementRef
} from '@angular/core';

import { NgRedux } from 'ng2-redux';
import { IAppState } from '../../store';

@Component({
  selector: 'rio-toggle',
  template: `
    <label class="switch">
      <input
      type="checkbox"
      (change)=toggleHandler($event)>
      <div class="slider round"></div>
    </label>
  `
})
export class RioToggle implements OnInit {
  @Input() matchFeatureId: string;
  @Output() onToggle = new EventEmitter<any>();

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private elementRef: ElementRef) {}

  ngOnInit() {
    let initialState = this.ngRedux.getState().toggles;
    let inputElement = this.elementRef.nativeElement.querySelector('label input[type=checkbox]');

    if (initialState[this.matchFeatureId]) {
      inputElement.setAttribute('checked', 'checked');
    }
  }

  toggleHandler(event) {
    this.onToggle.emit(event);
  }
};