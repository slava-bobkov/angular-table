import { Type } from "@angular/core";
import { TableColumnContext, TableColumn } from "./table.interfaces";
import { InjectionToken } from "@angular/core";
import { TextualColumnComponent } from "./components/columns/textual-column/textual-column.component";
import { ActionColumnComponent } from "./components/columns/action-column/action-column.component";
import { IconColumnComponent } from "./components/columns/icon-column/icon-column.component";
import { StateColumnComponent } from "./components/columns/state-column/state-column.component";
import { ImageColumnComponent } from "./components/columns/image-column/image-column.component";
import { BadgeColumnComponent } from "./components/columns/badge-column/badge-column.component";
import { CombinedValuesColumnComponent } from "./components/columns/combined-values-column/combined-values-column.component";

export const TABLE_COLUMNS = {
  Empty: "empty",
  Text: "text",
  Value: "value",
  List: "list",
  Date: "date",
  Action: "action",
  Icon: "icon",
  State: "state",
  Image: "image",
  Badge: "badge",
  Button: "button",
  NestedTable: "nested-table",
  NotificationSettings: "notification-settings",
  CombinedValues: "combined-values",
  Custom: "custom"
} as const;

export const TABLE_COLUMNS_COMPONENTS = new Map<TableColumn, Type<any>>([
  ["action", ActionColumnComponent],
  ["button", ActionColumnComponent],
  ["icon", IconColumnComponent],
  ["state", StateColumnComponent],
  ["image", ImageColumnComponent],
  ["badge", BadgeColumnComponent],
  ["text", TextualColumnComponent],
  ["value", TextualColumnComponent],
  ["list", TextualColumnComponent],
  ["date", TextualColumnComponent],
  ["text", TextualColumnComponent],
  ["combined-values", CombinedValuesColumnComponent]
]);
