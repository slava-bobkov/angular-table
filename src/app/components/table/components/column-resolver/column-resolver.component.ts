import {
  ChangeDetectionStrategy,
  Component,
  ComponentFactoryResolver,
  Injector,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation
} from "@angular/core";
import { TABLE_COLUMN_CONTEXT } from "../../classes/table-column";
import { TABLE_COLUMNS_COMPONENTS } from "../../table.constants";
import { TableColumnConfig } from "../../table.interfaces";

@Component({
  selector: "ngmy-column-resolver",
  template: "<ng-container #outlet></ng-container>",
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ColumnResolverComponent<T> implements OnInit, OnDestroy {
  @Input() public columnConfig: TableColumnConfig | undefined;
  @Input() public row: T | undefined;

  @ViewChild("outlet", { static: true, read: ViewContainerRef })
  public readonly outlet!: ViewContainerRef;

  constructor(
    private readonly cfr: ComponentFactoryResolver,
    private readonly injector: Injector
  ) {}

  public ngOnInit(): void {
    this.loadComponent(this.columnConfig!, this.row!);
  }

  public ngOnDestroy(): void {
    this.outlet.clear();
  }

  private loadComponent(columnConfig: TableColumnConfig, row: T): void {
    const component =
      columnConfig.type === "custom"
        ? columnConfig.customComponent!
        : TABLE_COLUMNS_COMPONENTS.get(columnConfig.type)!;
    const componentFactory = this.cfr.resolveComponentFactory(component);

    this.outlet.clear();
    this.outlet.createComponent(
      componentFactory,
      0,
      Injector.create({
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
      })
    );
  }
}
