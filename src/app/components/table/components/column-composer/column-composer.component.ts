import { EventEmitter } from '@angular/core';
import {
  ChangeDetectionStrategy,
  Component,
  Injector,
  Input,
  OnInit,
  Optional,
  Output,
  Type,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {
  MatCellDef,
  MatColumnDef,
  MatFooterCellDef,
  MatHeaderCellDef
} from '@angular/material/table';
import { Pure } from 'src/app/decorators/pure';
import { TableComponent } from '../../container/table.component';
import { TableService } from '../../services/table.service';
import {
  TABLE_COLUMN_CONTEXT,
  TABLE_COLUMNS,
  TABLE_COLUMNS_COMPONENTS
} from '../../table.constants';
import { TableColumn, TableColumnConfig, TableAction } from '../../table.interfaces';

@Component({
  selector: 'ngmy-column-composer',
  templateUrl: './column-composer.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ColumnComposerComponent<T extends { [key: string]: any } = object> implements OnInit {
  @Input()
  public set columnConfig(config: TableColumnConfig) {
    this._columnConfig = config;
    this.tableService.syncColumnDef(this.columnDef, config.id);
  }
  public _columnConfig!: TableColumnConfig;

  @Input() public sortDisabled: boolean = true;
  @Input('hideHeader') public headerHidden: boolean = false;
  @Input('hideFooter') public footerHidden: boolean = true;

  @Output() public readonly columnAction = new EventEmitter<TableAction<any>>();

  @ViewChild(MatColumnDef, { static: true }) public columnDef!: MatColumnDef;
  @ViewChild(MatHeaderCellDef, { static: true }) public headerCellDef!: MatHeaderCellDef;
  @ViewChild(MatFooterCellDef, { static: true }) public footerCellDef!: MatFooterCellDef;
  @ViewChild(MatCellDef, { static: true }) public cellDef!: MatCellDef;

  public component: Type<unknown> | undefined;
  public componentInjector: Injector | undefined;

  constructor(
    @Optional() private readonly table: TableComponent,
    private readonly injector: Injector,
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

  public ngOnDestroy(): void {
    this.tableService.removeColumnDef(this.table, this.columnDef);
  }

  public isSortDisabled(disabled: boolean, type: TableColumn): boolean {
    return disabled || type === TABLE_COLUMNS.Action || type === TABLE_COLUMNS.Icon;
  }

  public isClickable(type: TableColumn): boolean {
    return type === 'action';
  }

  @Pure
  public getColumnClasses({ type, classes = [] }: TableColumnConfig): Array<string> {
    return ([] as Array<string>).concat(`${type}-cell`, classes);
  }

  @Pure
  public getComponent({ type, customComponent }: TableColumnConfig): Type<any> {
    return type === 'custom' ? customComponent! : TABLE_COLUMNS_COMPONENTS.get(type)!;
  }

  @Pure
  public getInjector(columnConfig: TableColumnConfig | undefined, row: T | undefined): Injector {
    return Injector.create({
      parent: this.injector,
      providers: [
        {
          provide: TABLE_COLUMN_CONTEXT,
          useValue: {
            columnConfig,
            row
          }
        }
      ]
    });
  }
}
