import isNumber from 'is-number';
import { SortOrderType, UseSortProps } from './interface';

const useSorter = <T>(props: UseSortProps<T>) => {
  const { list, sortKey, sorter, order } = props;
  const createSortFn = (key: keyof T, order?: SortOrderType) => {
    return order
      ? (a: T, b: T) => {
          if (!order) {
            return 0;
          }
          const aValue = a[key];
          const bValue = b[key];
          if (isNumber(aValue) && isNumber(bValue)) {
            return order === 'asc'
              ? <number>aValue - <number>bValue
              : <number>bValue - <number>aValue;
          }
          return (order === 'asc' ? aValue > bValue : bValue > aValue) ? 1 : -1;
        }
      : void 0;
  };
  const sortedList = sortKey ? list.sort(createSortFn(sortKey, order)) : list;
  return { list: sorter ? sortedList.sort(sorter) : sortedList };
};

export default useSorter;
