import { MatPaginatorIntl } from "@angular/material/paginator";
import { TranslateService } from "@ngx-translate/core";

export class PaginatorIntl extends MatPaginatorIntl {
  private ofLabel: string;

  constructor(private readonly translate: TranslateService) {
    super();

    this.ofLabel = this.translate.instant("APP.OF");
    this.previousPageLabel = this.translate.instant("APP.PREV_PAGE");
    this.nextPageLabel = this.translate.instant("APP.NEXT_PAGE");
  }

  public getRangeLabel = (page: number, pageSize: number, length: number) => {
    return `${page * pageSize + 1} – ${Math.min((page + 1) * pageSize, length)} ${this.ofLabel} ${length}`;
  };
}
