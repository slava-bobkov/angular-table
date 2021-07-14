import { Component } from '@angular/core';
import { TableColumnConfig, TableAction } from './components/table/table.interfaces';

@Component({
  selector: 'ngmy-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  public columnsConfig: Array<TableColumnConfig> = [
    {
      id: 'val1',
      key: 'Text 1',
      type: 'text'
    },
    {
      id: 'val2',
      key: 'Text 2',
      type: 'text'
    },
    {
      id: 'val3',
      key: 'Action',
      type: 'action',
      actionLabel: 'Button'
    }
  ];
  public data: Array<{ id: string; val1: string; val2: number }> = [
    {
      id: '1',
      val1: 'Slava',
      val2: 123
    },
    {
      id: '2',
      val1: 'Egor',
      val2: 321
    }
  ];

  public onTableAction(event: TableAction<any>): void {
    console.log(event);
  }
}
