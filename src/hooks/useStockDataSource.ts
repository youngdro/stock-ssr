import { useRequest } from "ahooks";
import { Options } from "ahooks/lib/useRequest/src/types";
import { ICurrentStock, IKLineItem } from "../api/stock/tools/interface";
import {
  getCurrentAllStock,
  getLatestDailyHis,
  getLatestWeekHis,
  getLatestMonthHis,
  updateAllLatestDailyHis,
  updateAllLatestWeekHis,
  updateAllLatestMonthHis,
  getDailyHis,
  getWeekHis,
  getMonthHis,
} from "../api/stock";
import { SortOrderType, UseGetCurrentAllStockProps } from "./interface";

export const useGetCurrentAllStock = (props: UseGetCurrentAllStockProps) => {
  const { filter, sort, customFilter, pagination } = props;
  const { data: stockList = [], loading } = useRequest(() =>
    getCurrentAllStock()
  );
  const searchValueFilter = (item: ICurrentStock) =>
    filter?.searchValue
      ? item.code.indexOf(filter?.searchValue) > -1 ||
        item.name.indexOf(filter?.searchValue) > -1
      : true;
  const createSortFn = (key, order?: SortOrderType) => {
    return (a: ICurrentStock, b: ICurrentStock) => {
      if (!order) return 0;
      return (order === "asc" ? a[key] > b[key] : b[key] > a[key]) ? 1 : -1;
    };
  };
  const byCodeSort = createSortFn("code", sort?.byCode);
  const byPriceSort = createSortFn("close", sort?.byPrice);
  const byPctChgSort = createSortFn("pctChg", sort?.byPctChg);
  const byTurnSort = createSortFn("turn", sort?.byTurn);
  const byVolumeSort = createSortFn("volume", sort?.byVolume);
  const filteredList = stockList.filter(
    (item) =>
      searchValueFilter(item) && (customFilter ? customFilter(item) : true)
  );
  const sortedList = filteredList.sort(
    (a, b) =>
      byCodeSort(a, b) +
      byPriceSort(a, b) +
      byPctChgSort(a, b) +
      byTurnSort(a, b) +
      byVolumeSort(a, b)
  );
  return {
    stockList: sortedList,
    pageStockList:
      pagination?.current && pagination.pageSize
        ? sortedList.slice(
            pagination?.current - 1,
            pagination?.current + pagination?.pageSize - 1
          )
        : sortedList,
    loading,
  };
};

export const useGetLatestDailyHis = (
  code: string,
  options?: Options<IKLineItem[], string[]>
) => {
  const { data = [], loading } = useRequest(
    () => getLatestDailyHis({ params: { code } }),
    options
  );
  return { data, loading };
};

export const useGetLatestWeekHis = (
  code: string,
  options?: Options<IKLineItem[], string[]>
) => {
  const { data = [], loading } = useRequest(
    () => getLatestWeekHis({ params: { code } }),
    options
  );
  return { data, loading };
};

export const useGetLatestMonthHis = (
  code: string,
  options?: Options<IKLineItem[], string[]>
) => {
  const { data = [], loading } = useRequest(
    () => getLatestMonthHis({ params: { code } }),
    options
  );
  return { data, loading };
};
