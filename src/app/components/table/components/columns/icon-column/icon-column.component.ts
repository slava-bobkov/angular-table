import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { TableColumn } from '../../../classes/table-column';

@Component({
  selector: 'ngmy-icon-column',
  templateUrl: './icon-column.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconColumnComponent extends TableColumn {}
