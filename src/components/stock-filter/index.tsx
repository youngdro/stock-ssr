import React, { useState } from 'react';
import { Input } from 'antd';
import { ICurrentStock } from '../../api/stock/tools/interface';
import { UseFilterProps } from '../../hooks/interface';
import { Container } from './styled';

interface StockFilterProps {
  onFilter?: (options: Omit<UseFilterProps<ICurrentStock>, 'list'>) => void;
}

export const StockFilter: React.FC<StockFilterProps> = (props) => {
  const { onFilter } = props;

  const handleSearch = (val) => {
    onFilter && onFilter({ searchValue: val, searchKeys: ['code', 'name'] });
  };

  const renderSearchInput = () => {
    return (
      <Input.Search
        allowClear
        enterButton="搜索"
        size="large"
        onSearch={handleSearch}
        style={{ width: 220 }}
      />
    );
  };

  return <Container>{renderSearchInput()}</Container>;
};

export default StockFilter;
