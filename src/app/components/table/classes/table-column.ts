import { Directive, Inject } from '@angular/core';
import { TABLE_COLUMN_CONTEXT } from '../table.constants';
import { TableColumnContext } from '../table.interfaces';

@Directive()
export class TableColumn {
  constructor(@Inject(TABLE_COLUMN_CONTEXT) public readonly context: TableColumnContext) {}
}
