import { EventEmitter } from "@angular/core";
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  Optional,
  Output,
  ViewChild,
  ViewEncapsulation
} from "@angular/core";
import {
  MatCellDef,
  MatColumnDef,
  MatFooterCellDef,
  MatHeaderCellDef
} from "@angular/material/table";
import { Pure } from "src/app/decorators/pure";
import { TableComponent } from "../../container/table.component";
import { TableService } from "../../services/table.service";
import { TABLE_COLUMNS } from "../../table.constants";
import { TableColumn, TableColumnConfig, TableAction } from "../../table.interfaces";

@Component({
  selector: "ngmy-column-composer",
  templateUrl: "./column-composer.component.html",
  styleUrls: ["../../styles/column.scss"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ColumnComposerComponent implements OnInit {
  @Input() public sortDisabled: boolean = true;
  @Input("hideHeader") public headerHidden: boolean = false;
  @Input("hideFooter") public footerHidden: boolean = true;

  @Input()
  public set columnConfig(config: TableColumnConfig) {
    this._columnConfig = config;
    this.tableService.syncColumnDef(this.columnDef, config.id);
  }
  public _columnConfig!: TableColumnConfig;

  @Output() public readonly columnAction = new EventEmitter<TableAction<any>>();

  @ViewChild(MatColumnDef, { static: true }) public readonly columnDef!: MatColumnDef;
  @ViewChild(MatHeaderCellDef, { static: true }) public readonly headerCellDef!: MatHeaderCellDef;
  @ViewChild(MatFooterCellDef, { static: true }) public readonly footerCellDef!: MatFooterCellDef;
  @ViewChild(MatCellDef, { static: true }) public readonly cellDef!: MatCellDef;

  constructor(
    @Optional() private readonly table: TableComponent,
    private readonly tableService: TableService
  ) {}

  public ngOnInit(): void {
    this.tableService.syncColumnDef(this.columnDef, this._columnConfig.id);
    this.tableService.addColumnDef(
      this.table,
      this.columnDef,
      this.cellDef,
      this.headerCellDef,
      this.footerCellDef
    );
  }

  public isSortDisabled(disabled: boolean, type: TableColumn): boolean {
    return disabled || type === TABLE_COLUMNS.Action || type === TABLE_COLUMNS.Icon;
  }

  public isClickable(type: TableColumn): boolean {
    return type === "action";
  }

  @Pure
  public getColumnClasses({ type, classes = [] }: TableColumnConfig): Array<string> {
    return ([] as Array<string>).concat(`${type}-column`, classes);
  }
}
