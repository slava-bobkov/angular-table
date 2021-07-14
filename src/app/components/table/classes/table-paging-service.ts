import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { BehaviorSubject, merge, Observable } from 'rxjs';
import { mapTo } from 'rxjs/operators';
import { TablePagingMetadata } from '../table.interfaces';

export abstract class TablePagingService<T extends object> {
  public abstract loadData(): Observable<TablePagingMetadata<T>>;

  private sort: MatSort | undefined;
  private paginator: MatPaginator | undefined;

  private readonly filterSubject = new BehaviorSubject<string | void>(void 0);

  public resetPagination(): void {
    if (this.paginator) {
      this.paginator.firstPage();
      this.paginator.page.emit({
        pageIndex: 0,
        pageSize: this.paginator.pageSize,
        length: this.paginator.length
      });
    }
  }

  public setPaging(paginator: MatPaginator): void {
    this.paginator = paginator;
  }

  public getPaging(): Observable<PageEvent | void> {
    return merge(
      this.paginator!.initialized.pipe(
        mapTo({
          pageIndex: 0,
          pageSize: this.initialPageSize,
          length: this.paginator!.length
        })
      ),
      this.paginator!.page
    );
  }

  public setSort(sort: MatSort): void {
    this.sort = sort;
  }

  public getSort(): Observable<Sort | void> {
    return merge(
      this.sort!.initialized.pipe(
        mapTo({
          active: this.sort!.active,
          direction: this.sort!.direction
        })
      ),
      this.sort!.sortChange
    );
  }

  public setFilter(filter: string): void {
    this.filterSubject.next(filter);
  }

  public getFilter(): Observable<string | void> {
    return this.filterSubject.asObservable();
  }

  private get initialPageSize(): number {
    return (
      (this.paginator!.pageSizeOptions && this.paginator!.pageSizeOptions[0]) ||
      this.paginator!.pageSize ||
      10
    );
  }
}
