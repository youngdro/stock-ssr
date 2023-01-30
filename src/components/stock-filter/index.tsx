import React, { useState, useRef } from 'react';
import { Input, Button, Drawer, Space } from 'antd';
import isNumber from 'is-number';
import { ICurrentStock } from '../../api/stock/tools/interface';
import { UseFilterProps } from '../../hooks/interface';
import FilterPanel from './panel';
import { Container } from './styled';

interface StockFilterProps {
  onFilter?: (options: Omit<UseFilterProps<ICurrentStock>, 'list'>) => void;
}

export const StockFilter: React.FC<StockFilterProps> = (props) => {
  const { onFilter } = props;
  const [panelVisible, setPanelVisible] = useState(false);
  const filterValuesRef = useRef({});
  const searchValueRef = useRef('');

  const getFilterFunc = () => {
    const filterRangeValues: Partial<Record<keyof ICurrentStock, [number, number]>> = { ...filterValuesRef.current };
    if (Object.keys(filterRangeValues)?.length) {
      return (item: ICurrentStock) => {
        return Object.keys(filterRangeValues).reduce((res, filterKey) => {
          const value = item[filterKey];
          const range = filterRangeValues[filterKey];
          if (value === void 0) return true;
          const _value = isNumber(value) ? parseFloat(value) : value;
          return (_value >= range[0] && _value <= range[1]) && res;
        }, true);
      };
    }
    return void 0;
  };

  const handleSearch = (val) => {
    const filter = getFilterFunc();
    searchValueRef.current = val;
    onFilter && onFilter({ searchValue: val, searchKeys: ['code', 'name'], filter });
  };

  const handleFilter = () => {
    handleSearch(searchValueRef.current);
    hideFilterPanel();
  };

  const onFilterValuesChange = (values) => {
    filterValuesRef.current = values;
  };

  const showFilterPanel = () => setPanelVisible(true);
  const hideFilterPanel = () => setPanelVisible(false);

  const renderSearchInput = () => {
    return (
      <Input.Search
        allowClear
        enterButton="搜索"
        size="large"
        placeholder="股票名称/代码"
        onSearch={handleSearch}
        style={{ width: 220 }}
      />
    );
  };

  const renderDrawExtra = () => (
    <Space>
      <Button type="primary" onClick={handleFilter}>
        提交
      </Button>
    </Space>
  );

  return (
    <Container>
      {renderSearchInput()}
      <Button type="primary" onClick={showFilterPanel}>更多筛选</Button>
      <Drawer title="更多筛选" placement="right" onClose={hideFilterPanel} open={panelVisible} extra={renderDrawExtra()}>
        <FilterPanel onChange={onFilterValuesChange} />
      </Drawer>
    </Container>
  );
};

export default StockFilter;
