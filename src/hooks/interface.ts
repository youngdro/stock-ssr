import { ICurrentStock } from "../api/stock/tools/interface";

export type SortOrderType = "asc" | "desc";

export interface UseGetCurrentAllStockProps {
  filter?: {
    searchValue?: string;
  };
  customFilter?: (item: ICurrentStock) => ICurrentStock[];
  sort?: {
    byCode?: SortOrderType; // 按code排序
    byPrice?: SortOrderType; // 按价格排序
    byPctChg?: SortOrderType; // 按涨跌幅排序
    byTurn?: SortOrderType; // 按换手率排序
    byVolume?: SortOrderType; // 按成交量排序
  };
  pagination?: {
    current?: number;
    pageSize?: number;
  };
}
