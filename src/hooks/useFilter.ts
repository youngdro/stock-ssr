import { UseFilterProps } from "./interface";

const useFilter = <T>(props: UseFilterProps<T>) => {
  const { list, searchValue, searchKeys, filter } = props;
  const searchValueFilter = (item: T) => {
    return searchKeys?.reduce((pre, key) => {
      return pre || String(item[key]).indexOf(searchValue) > -1;
    }, false);
  };
  const filteredList = list.filter(searchValueFilter);
  return { list: filter ? filteredList.filter(filter) : filteredList };
};

export default useFilter;