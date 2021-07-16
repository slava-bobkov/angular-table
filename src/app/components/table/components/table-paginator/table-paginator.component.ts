import { ChangeDetectionStrategy, Component, Input, ViewChild, ViewEncapsulation } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { TablePagingConfig } from "../../table.interfaces";

@Component({
  selector: "ngmy-table-paginator",
  templateUrl: "./table-paginator.component.html",
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TablePaginatorComponent {
  @Input()
  public set config(config: TablePagingConfig) {
    this._config = config;
  }
  public _config!: TablePagingConfig;

  @ViewChild(MatPaginator, { static: true }) public readonly matPaginator!: MatPaginator;

  public get type(): String {
    return this._config.type || "compact";
  }
}
