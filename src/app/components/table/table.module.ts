import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { ColumnComposerComponent } from './components/column-composer/column-composer.component';
import { TableComponent } from './container/table.component';
import { TableFilterComponent } from './components/table-filter/table-filter.component';
import { TablePaginatorComponent } from './components/table-paginator/table-paginator.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { TABLE_VALUE_FORMAT } from './table.tokens';
import { IconColumnComponent } from './components/columns/icon-column/icon-column.component';
import { StateColumnComponent } from './components/columns/state-column/state-column.component';
import { ImageColumnComponent } from './components/columns/image-column/image-column.component';
import { BadgeColumnComponent } from './components/columns/badge-column/badge-column.component';
import { CombinedValuesColumnComponent } from './components/columns/combined-values-column/combined-values-column.component';
import { TextualColumnComponent } from './components/columns/textual-column/textual-column.component';
import { ActionColumnComponent } from './components/columns/action-column/action-column.component';
import { PaginatorIntl } from './classes/paginator-intl';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    TableComponent,
    TableFilterComponent,
    TablePaginatorComponent,
    ColumnComposerComponent,
    TextualColumnComponent,
    IconColumnComponent,
    StateColumnComponent,
    ImageColumnComponent,
    BadgeColumnComponent,
    CombinedValuesColumnComponent,
    ActionColumnComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [
    { provide: TABLE_VALUE_FORMAT, useValue: '1.0-0' },
    {
      provide: MatPaginatorIntl,
      useClass: PaginatorIntl,
      deps: [TranslateService]
    }
  ],
  exports: [TableComponent, TableFilterComponent]
})
export class TableModule {}
