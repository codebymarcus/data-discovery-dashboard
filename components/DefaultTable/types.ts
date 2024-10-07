import { ColumnDef, Row, Table as TableType } from "@tanstack/react-table";

export interface HeaderCheckboxProps<TData> {
  table: TableType<TData>;
}
export interface RowCheckboxProps<TData> {
  row: Row<TData>;
}

export type DefaultTableButtonClickParamsType = {
  action: 'delete' | 'edit',
  data: any
}
export type DefaultTableProps<TData> = {
  data: TData[]
  columns: ColumnDef<TData, any>[]
  onButtonClick?: (params: DefaultTableButtonClickParamsType) => void
  isLoading: boolean
}