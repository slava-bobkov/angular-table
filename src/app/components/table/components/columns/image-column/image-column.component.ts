import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { TableColumn } from '../../../classes/table-column';

@Component({
  selector: 'ngmy-image-column',
  templateUrl: './image-column.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageColumnComponent extends TableColumn {}
