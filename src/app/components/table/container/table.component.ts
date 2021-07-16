import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Host,
  Inject,
  Input,
  OnDestroy,
  Optional,
  Output,
  ViewChild
} from "@angular/core";
import { MatSort } from "@angular/material/sort";
import { MatTable } from "@angular/material/table";
import { asyncScheduler, BehaviorSubject, combineLatest, Observable, Subscription } from "rxjs";
import { map, observeOn, switchMap, tap } from "rxjs/operators";
import { TableDataSource } from "../classes/table-data-source";
import { TablePaginatorComponent } from "../components/table-paginator/table-paginator.component";
import { TablePagingService } from "../classes/table-paging-service";
import { TableColumnConfig, TableAction, TablePagingConfig } from "../table.interfaces";
import { TABLE_PAGING_SERVICE } from "../table.tokens";

@Component({
  selector: "ngmy-table",
  templateUrl: "./table.component.html",
  styleUrls: ["../styles/table.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: "ngmy-table"
  }
})
export class TableComponent<T extends { [key: string]: any } = object>
  implements AfterViewInit, OnDestroy
{
  @Input() public sortActive: string = "";
  @Input() public sortDirection: "desc" | "asc" = "desc";
  @Input("disableSort")
  public set sortDisabled(disabled: boolean) {
    this._sortDisabled = disabled;
    this.sortRefSubject.next(disabled);
  }
  public _sortDisabled: boolean = true;

  @Input()
  public set pagingConfig(config: TablePagingConfig) {
    this._pagingConfig = config;
    this.paginatorRefSubject.next(!!config);
  }
  public _pagingConfig: TablePagingConfig | undefined;

  @Input()
  public set columnsConfig(config: Array<TableColumnConfig>) {
    this._columnsConfig = config;

    this.columnsToDisplay = config.map(({ id }) => id);
    this.footerHidden = !config.find(({ footer }) => !!footer);
    this.dataSource.columnsConfig = config;
  }
  public _columnsConfig: Array<TableColumnConfig> = [];

  @Input() public nestedColumnsConfig: Array<TableColumnConfig> = [];

  @Input()
  public set data(data: Array<T> | undefined) {
    this.dataSubject.next(data);
  }

  @Input("hideFilter") public filterHidden: boolean = false;
  @Input("filterLabel") public filterLabel: string = "FRAMEWORK.TABLE.FILTER";
  @Input("hideHeader") public headerHidden: boolean = false;
  @Input("expandable") public multiTemplateDataRows: boolean = false;
  @Input() public fixedLayout: boolean = false;
  @Input() public scrollableX: boolean = false;
  @Input() public scrollableY: boolean = false;

  @Output() public readonly tableAction = new EventEmitter<TableAction<T>>();

  public footerHidden: boolean = true;

  @ViewChild(MatTable, { static: true }) public readonly matTable!: MatTable<T>;
  @ViewChild(MatSort, { static: true }) public readonly sortRef!: MatSort;
  @ViewChild(TablePaginatorComponent) public readonly paginatorRef:
    | TablePaginatorComponent
    | undefined;

  public nestedColumnsToDisplay: Array<string> = [];
  public columnsToDisplay: Array<string> = [];
  public readonly dataSource = new TableDataSource<T>([]);

  public get attrColspan(): number {
    return this.columnsToDisplay.length || 1;
  }

  private readonly paginatorRefSubject = new BehaviorSubject<boolean>(false);
  private readonly sortRefSubject = new BehaviorSubject<boolean>(false);
  private readonly dataSubject = new BehaviorSubject<Array<T> | undefined>([]);

  private raceConditionSubscription!: Subscription;

  constructor(
    @Optional()
    @Host()
    @Inject(TABLE_PAGING_SERVICE)
    private readonly pagingService: TablePagingService<T>
  ) {}

  public ngAfterViewInit(): void {
    this.raceConditionSubscription = combineLatest([this.getSorting(), this.getPagining()])
      .pipe(
        observeOn(asyncScheduler),
        switchMap(() => (this.pagingService ? this.getPagingData() : this.dataSubject))
      )
      .subscribe((data) => (this.dataSource.data = data || []));
  }

  public ngOnDestroy(): void {
    this.raceConditionSubscription?.unsubscribe();
  }

  public trackById(_: number, item: TableColumnConfig): string {
    return item.id;
  }

  public onFilterChange(filter: string): void {
    if (this.pagingService) {
      this.pagingService.setFilter(filter);
    } else {
      this.dataSource.filter = filter;
    }
  }

  protected getSorting(): Observable<boolean> {
    return this.sortRefSubject.pipe(
      tap((disabled) => {
        if (this.pagingService) {
          this.pagingService.setSort(this.sortRef);
        } else if (!disabled) {
          this.dataSource.sort = this.sortRef;
        }
      })
    );
  }

  protected getPagining(): Observable<boolean> {
    return this.paginatorRefSubject.asObservable().pipe(
      tap((show) => {
        if (show) {
          if (this.pagingService) {
            this.pagingService.setPaging(this.paginatorRef!.matPaginator);
          } else {
            this.dataSource.paginator = this.paginatorRef!.matPaginator;
          }
        }
      })
    );
  }

  private getPagingData(): Observable<Array<T>> {
    return this.pagingService.loadData().pipe(
      tap(({ total }) => (this.paginatorRef!.matPaginator.length = total)),
      map(({ data }) => data)
    );
  }
}
