import { Directive, Inject, InjectionToken } from "@angular/core";
import { TableColumnContext } from "../table.interfaces";

export const TABLE_COLUMN_CONTEXT = new InjectionToken<TableColumnContext>("Context for column");

@Directive()
export class TableColumn {
  constructor(@Inject(TABLE_COLUMN_CONTEXT) public readonly context: TableColumnContext) {}
}
