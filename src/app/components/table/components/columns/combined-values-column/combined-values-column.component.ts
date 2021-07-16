import { ChangeDetectionStrategy, Component, ViewEncapsulation } from "@angular/core";
import { TableColumn } from "../../../classes/table-column";

@Component({
  selector: "ngmy-combined-values-column",
  templateUrl: "./combined-values-column.component.html",
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CombinedValuesColumnComponent extends TableColumn {}
