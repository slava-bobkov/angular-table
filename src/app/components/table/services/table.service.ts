import { Injectable } from "@angular/core";
import { MatCellDef, MatColumnDef, MatFooterCellDef, MatHeaderCellDef } from "@angular/material/table";
import { TableColumn } from "../classes/table-column";
import { TableComponent } from "../container/table.component";

@Injectable({ providedIn: "root" })
export class TableService {
  public addColumnDef(
    table: TableComponent,
    columnDef: MatColumnDef,
    cellDef: MatCellDef,
    headerCellDef?: MatHeaderCellDef,
    footerCellDef?: MatFooterCellDef
  ): void {
    if (table) {
      columnDef.headerCell = headerCellDef!;
      columnDef.footerCell = footerCellDef!;
      columnDef.cell = cellDef;
      table.matTable.addColumnDef(columnDef);
    }
  }

  public removeColumnDef(table: TableComponent, columnDef: MatColumnDef): void {
    if (table) {
      table.matTable.removeColumnDef(columnDef);
    }
  }

  public syncColumnDef(columnDef: MatColumnDef, name: string): void {
    if (columnDef) {
      // 'name' from cdk interface - id from component interface
      columnDef.name = name;
    }
  }
}
