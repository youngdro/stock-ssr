import { useRequest } from 'ahooks';
import { ICurrentStock } from '../api/stock/tools/interface';
import {
    getCurrentAllStock, getLatestDailyHis,
    updateAllLatestDailyHis, updateAllLatestWeekHis, updateAllLatestMonthHis,
    getDailyHis, getWeekHis, getMonthHis,
} from '../api/stock';

type SortOrderType = 'asc' | 'desc';

interface UseGetCurrentAllStockProps {
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

export const useGetCurrentAllStock = (props: UseGetCurrentAllStockProps) => {
    const { filter, sort, customFilter, pagination } = props;
    const { data: stockList = [], loading } = useRequest(() => getCurrentAllStock());
    const searchValueFilter = (item: ICurrentStock) => (filter?.searchValue ? (item.code.indexOf(filter?.searchValue) > -1 || item.name.indexOf(filter?.searchValue) > -1) : true);
    const createSortFn = (key, order?: SortOrderType) => {
      return (a: ICurrentStock, b: ICurrentStock) => {
        if (!order) return 0;
        return (order === 'asc' ? (a[key] > b[key]) : (b[key] > a[key])) ? 1 : -1;
      };
    };
    const byCodeSort = createSortFn('code', sort?.byCode);
    const byPriceSort = createSortFn('close', sort?.byPrice);
    const byPctChgSort = createSortFn('pctChg', sort?.byPctChg);
    const byTurnSort = createSortFn('turn', sort?.byTurn);
    const byVolumeSort = createSortFn('volume', sort?.byVolume);
    const filteredList = stockList.filter((item) => (
        searchValueFilter(item) && (customFilter ? customFilter(item) : true)
    ));
    const sortedList = filteredList.sort((a, b) => (
        byCodeSort(a, b) + byPriceSort(a, b) + byPctChgSort(a, b) + byTurnSort(a, b) + byVolumeSort(a, b)
    ));
    return {
      stockList: sortedList,
      pageStockList: pagination?.current && pagination.pageSize ? sortedList.slice(pagination?.current - 1, pagination?.current + pagination?.pageSize - 1) : sortedList,
      loading,
    };
};
