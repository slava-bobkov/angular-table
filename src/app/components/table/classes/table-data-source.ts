import { MatTableDataSource } from '@angular/material/table';
import { TableColumnConfig } from '../table.interfaces';

export class TableDataSource<
  T extends { [key: string]: any } = object
> extends MatTableDataSource<T> {
  private propertiesAccessorsMap!: ReadonlyMap<string, TableColumnConfig['propertyAccessor']>;
  private _columnsConfigs: Array<TableColumnConfig> = [];

  constructor(initialData: Array<T> = []) {
    super(initialData);
  }

  public get columnsConfigs(): Array<TableColumnConfig> {
    return this._columnsConfigs;
  }

  public set columnsConfigs(columns: Array<TableColumnConfig>) {
    this.propertiesAccessorsMap = new Map(
      columns
        .filter(({ propertyAccessor }) => propertyAccessor)
        .map(({ id, propertyAccessor }) => [id, propertyAccessor])
    );
    this._columnsConfigs = columns;
  }
  /**
   * Data accessor function that is used for accessing data properties for sorting through
   * the default sortData function.
   * This default function assumes that the sort header IDs (which defaults to the column name)
   * matches the data's properties (e.g. column Xyz represents data['Xyz']).
   * Custom extension also check if 'propAccessor' was exist in column config.
   * @param data Data object that is being accessed.
   * @param sortHeaderId The name of the column that represents the data.
   */
  public sortingDataAccessor = (data: T, sortHeaderId: string): string | number => {
    return this.propertiesAccessorsMap.has(sortHeaderId)
      ? this.propertiesAccessorsMap.get(sortHeaderId)!(data, sortHeaderId)
      : data[sortHeaderId];
  };

  /**
   * Checks if a data object matches the data source's filter string. By default, each data object
   * is converted to a string of its properties and returns true if the filter has
   * at least one occurrence in that string. By default, the filter string has its whitespace
   * trimmed and the match is case-insensitive.
   * Custom extension also check if 'propAccessor' was exist in column config.
   * @param data Data object used to check against the filter.
   * @param filter Filter string that has been set on the data source.
   * @returns Whether the filter matches against the data
   */
  public filterPredicate = (data: T, filter: string): boolean => {
    // Transform the data into a lowercase string of all property values.
    const dataStr = this.columnsConfigs
      .map(({ id }) => id)
      .reduce((currentTerm: string, key: string) => {
        const value = this.propertiesAccessorsMap.has(key)
          ? this.propertiesAccessorsMap.get(key)!(data, key)
          : data[key];
        // Use an obscure Unicode character to delimit the words in the concatenated string.
        // This avoids matches where the values of two columns combined will match the user's query
        // (e.g. `Flute` and `Stop` will match `Test`). The character is intended to be something
        // that has a very low chance of being typed in by somebody in a text field. This one in
        // particular is "White up-pointing triangle with dot" from
        // https://en.wikipedia.org/wiki/List_of_Unicode_characters
        return `${currentTerm}${value}◬`;
      }, '')
      .toLowerCase();

    // Transform the filter by converting it to lowercase and removing whitespace.
    const transformedFilter = filter.trim().toLowerCase();

    return dataStr.includes(transformedFilter);
  };
}
