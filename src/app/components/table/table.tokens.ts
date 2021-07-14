import { InjectionToken } from '@angular/core';
import { TablePagingService } from './services/table-paging-service';

export const TABLE_VALUE_FORMAT = new InjectionToken<string>('Digits format for values');

export const TABLE_PAGING_SERVICE = new InjectionToken<TablePagingService<object>>(
  'Default TablePagingService'
);
