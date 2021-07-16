import { ChangeDetectionStrategy, Component, ViewEncapsulation } from "@angular/core";
import { TableColumn } from "../../../classes/table-column";

@Component({
  selector: "ngmy-state-column",
  templateUrl: "./state-column.component.html",
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StateColumnComponent extends TableColumn {}
