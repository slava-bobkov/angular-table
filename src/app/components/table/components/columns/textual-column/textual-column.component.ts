import { formatCurrency, formatDate, getCurrencySymbol } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
  ViewEncapsulation
} from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { TableColumn, TABLE_COLUMN_CONTEXT } from "../../../classes/table-column";
import { TableColumnContext, TableColumnConfig } from "../../../table.interfaces";
import { TABLE_VALUE_FORMAT } from "../../../table.tokens";

@Component({
  selector: "ngmy-textual-column",
  templateUrl: "./textual-column.component.html",
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextualColumnComponent extends TableColumn implements OnInit {
  private readonly placeholder = "-";

  constructor(
    @Inject(TABLE_COLUMN_CONTEXT) public readonly context: TableColumnContext,
    @Inject(TABLE_VALUE_FORMAT) private readonly valueFormat: string,
    private readonly translate: TranslateService
  ) {
    super(context);
  }

  public ngOnInit(): void {
    console.log("init");
  }

  public transform(value: unknown, { type, dateFormat }: TableColumnConfig): string {
    if (!value) {
      return String(value);
    }

    switch (type) {
      case "date": {
        return value
          ? formatDate(value as string | number | Date, dateFormat!, "de-ch")
          : this.placeholder;
      }
      case "value": {
        const currency = getCurrencySymbol("EUR", "wide", "de");
        return value
          ? formatCurrency(value as number, "de", currency, "EUR", this.valueFormat)
          : this.placeholder;
      }
      case "list": {
        return value ? (value as Array<string>).join("\n") : this.placeholder;
      }
      case "text": {
        if (typeof value === "string") {
          return value ? this.translate.instant(value) : this.placeholder;
        } else {
          return value ? String(value) : this.placeholder;
        }
      }
      default: {
        return value as string;
      }
    }
  }
}
