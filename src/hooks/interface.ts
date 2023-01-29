import { ICurrentStock } from "../api/stock/tools/interface";

export type SortOrderType = "asc" | "desc";

export type SortFuncType<T> = (a: T, b: T) => number;

export interface UseFilterProps<T extends {}> {
  list: T[];
  searchValue?: string;
  searchKeys?: (keyof T)[];
  filter?: (item: T) => boolean;
}

export interface UseSortProps<T extends {}> {
  list: T[];
  sortKey?: keyof T;
  order?: SortOrderType;
  sorter?: SortFuncType<T>;
}

export interface UseGetCurrentAllStockProps {
  filterProps?: Omit<UseFilterProps<ICurrentStock>, 'list'>;
  sorterProps?: Omit<UseSortProps<ICurrentStock>, 'list'>;
  pagination?: {
    current?: number;
    pageSize?: number;
  };
}
