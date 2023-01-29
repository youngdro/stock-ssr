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
import { UseGetCurrentAllStockProps } from "./interface";
import useFilter from "./useFilter";
import useSorter from "./useSorter";

export const useGetCurrentAllStock = (props: UseGetCurrentAllStockProps) => {
  const { filterProps, sorterProps, pagination } = props;
  const { data: stockList = [], loading } = useRequest(() =>
    getCurrentAllStock()
  );
  const { list: filteredList } = useFilter<ICurrentStock>({ ...filterProps, list: stockList });
  const { list: sortedList } = useSorter<ICurrentStock>({ ...sorterProps, list: filteredList });
  const startCursor = (pagination?.current - 1) * pagination?.pageSize;
  const endCursor = startCursor + pagination?.pageSize;
  return {
    stockList: sortedList,
    pageStockList:
      pagination?.current && pagination.pageSize
        ? sortedList.slice(startCursor, endCursor)
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
