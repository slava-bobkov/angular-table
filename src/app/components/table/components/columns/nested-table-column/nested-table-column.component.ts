import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  Self,
  SkipSelf,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { MatCellDef, MatColumnDef } from '@angular/material/table';
import { TableComponent } from '../../../container/table.component';
import { TableService } from '../../../services/table.service';
import { TableAction, TableColumnConfig } from '../../../table.interfaces';

@Component({
  selector: 'ngmy-nested-table-column',
  templateUrl: './nested-table-column.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NestedTableColumnComponent implements OnInit, OnDestroy {
  @Input()
  public set name(name: string) {
    this._name = name;
    this.tableService.syncColumnDef(this.columnDef, name);
  }
  public _name!: string;

  @Input() public columnsConfig: Array<TableColumnConfig> = [];

  @Output() public readonly columnAction = new EventEmitter<TableAction<any>>();

  @ViewChild(MatColumnDef, { static: true }) public columnDef!: MatColumnDef;
  @ViewChild(MatCellDef, { static: true }) public cellDef!: MatCellDef;

  constructor(
    @Optional() private readonly table: TableComponent,
    private readonly tableService: TableService
  ) {}

  public ngOnInit(): void {
    this.tableService.syncColumnDef(this.columnDef, this._name);
    this.tableService.addColumnDef(this.table, this.columnDef, this.cellDef);
  }

  public ngOnDestroy(): void {
    this.tableService.removeColumnDef(this.table, this.columnDef);
  }

  public get attrColspan(): number {
    return this.table.attrColspan;
  }
}
