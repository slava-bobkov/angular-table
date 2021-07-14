import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'table-filter',
  templateUrl: './table-filter.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableFilterComponent implements OnInit, OnDestroy {
  @Input() public filterLabel: string = '';
  @Input() public set value(_value: string) {
    this.control.setValue(_value);
  }

  @Output() public readonly filterChanged = new EventEmitter<string>();

  public readonly control = new FormControl('');

  private controlSubscription!: Subscription;

  public ngOnInit(): void {
    this.controlSubscription = this.control.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged(), map(String))
      .subscribe((value) => this.filterChanged.emit(value));
  }

  public ngOnDestroy(): void {
    this.controlSubscription?.unsubscribe();
  }
}
