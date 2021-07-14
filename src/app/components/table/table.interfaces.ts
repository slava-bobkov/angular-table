import { Type } from '@angular/core';
import { TABLE_COLUMNS } from './table.constants';

export interface TableColumnConfig {
  /** Corresponds to a key of the objects in the data array */
  id: string;
  /** Template type for the cells in the column */
  type: TableColumn;
  /** Translation key for the column header */
  key: string;
  /** Date format for date representation which will be used for type = 'date' */
  dateFormat?: string;
  /** Additional column css selectors */
  classes?: Array<string> | string;
  /** Column style object for ngStyle */
  style?: { [klass: string]: any };
  /** Configuration for sticky column at start */
  sticky?: boolean;
  /** Configuration for sticky column at the end */
  stickyEnd?: boolean;
  /** Column items which will be used for type = 'combined-values' */
  combinedValues?: Array<{
    /** Corresponds to a key of the objects in the data array */
    id: string;
    /** Template type for the cells in the column */
    type: TableColumn;
    /** Show tooltip on hover */
    tooltip?: boolean;
  }>;
  /** Icon for column type = 'action' */
  actionIcon?: string;
  /** Textual content for column type = 'action' */
  actionLabel?: string;
  /** Footer options */
  footer?: {
    type: 'text' | 'value';
    key?: string;
    value?: number;
  };
  /** Custom template for table cell */
  customComponent?: Type<any>;
  /** Custom property accessor if default cant be use */
  propertyAccessor?: (data: unknown, id: string) => string | number;
  /** Custom button column accessor for disabling */
  buttonDisabledAccessor?: (data: unknown) => boolean;
  /** Icon for column type = 'action' when row selected */
  selectedIcon?: string;
}

export interface TableAction<T> {
  element: T;
  [key: string]: any;
}

export interface TableColumnContext {
  columnConfig: TableColumnConfig;
  row: { [key: string]: any };
}

export type TableColumn = typeof TABLE_COLUMNS[keyof typeof TABLE_COLUMNS];

export interface TablePagingMetadata<T> {
  total: number;
  data: Array<T>;
}

export interface TablePagingConfig {
  pageSize: number;
  /**
   * Types between full functionality of the pagination (first, last buttons, options) and compact
   * "compact" is default type
   */
  type?: 'compact' | 'full';
  length?: number;
  pageSizeOptions?: Array<number>;
  pageIndex?: number;
}
