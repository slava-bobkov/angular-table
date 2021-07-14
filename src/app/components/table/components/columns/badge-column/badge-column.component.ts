import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { TableColumn } from '../../../classes/table-column';

@Component({
  selector: 'ngmy-badge-column',
  templateUrl: './badge-column.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BadgeColumnComponent extends TableColumn {}
