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
  ViewContainerRef,
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
  public get columnConfig(): TableColumnConfig {
    return this._columnConfig;
  }
  public set columnConfig(config: TableColumnConfig) {
    this._columnConfig = config;
    this.syncColumnDef();
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
  @ViewChild('vc', { read: ViewContainerRef }) public vc!: ViewContainerRef;

  public component: Type<unknown> | undefined;
  public componentInjector: Injector | undefined;

  constructor(
    @Optional() private readonly table: TableComponent,
    private readonly injector: Injector
  ) {}

  public ngOnInit(): void {
    this.syncColumnDef();

    if (this.table) {
      this.columnDef.headerCell = this.headerCellDef;
      this.columnDef.footerCell = this.footerCellDef;
      this.columnDef.cell = this.cellDef;
      this.table.matTable.addColumnDef(this.columnDef);
    }
  }

  public ngOnDestroy(): void {
    if (this.table) {
      this.table.matTable.removeColumnDef(this.columnDef);
    }
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

  private syncColumnDef(): void {
    if (this.columnDef) {
      // 'name' from cdk interface - id from component interface
      this.columnDef.name = this.columnConfig.id;
    }
  }
}
