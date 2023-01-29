import React, { useState } from 'react';
import { Input, Button, Drawer } from 'antd';
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

  const handleSearch = (val) => {
    onFilter && onFilter({ searchValue: val, searchKeys: ['code', 'name'] });
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

  return (
    <Container>
      {renderSearchInput()}
      <Button type="primary" onClick={showFilterPanel}>更多筛选</Button>
      <Drawer title="更多筛选" placement="right" onClose={hideFilterPanel} open={panelVisible}>
        <FilterPanel />
      </Drawer>
    </Container>
  );
};

export default StockFilter;
