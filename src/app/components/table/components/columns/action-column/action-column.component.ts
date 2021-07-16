import { ChangeDetectionStrategy, Component, ViewEncapsulation } from "@angular/core";
import { Pure } from "src/app/decorators/pure";
import { TableColumn } from "../../../classes/table-column";
import { TableColumnContext } from "../../../table.interfaces";

@Component({
  selector: "ngmy-action-column",
  templateUrl: "./action-column.component.html",
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActionColumnComponent extends TableColumn {
  @Pure
  public isButtonDisabled(
    columnConfig: TableColumnContext["columnConfig"],
    row: TableColumnContext["row"]
  ): boolean {
    return (
      Boolean(columnConfig.buttonDisabledAccessor) && columnConfig.buttonDisabledAccessor!(row)
    );
  }
}
