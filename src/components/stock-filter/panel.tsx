import React from 'react';
// import { Input, Slider, Switch, InputNumber } from 'antd';
// import { ICurrentStock } from '../../api/stock/tools/interface';
// import { UseFilterProps } from '../../hooks/interface';
import { FilterPanelContainer } from './styled';
import { PriceRangeFilter, TurnRangeFilter } from './range-filters';

interface FilterPanelProps {}


const FilterPanel: React.FC<FilterPanelProps> = (props) => {
  return (
    <FilterPanelContainer>
      <PriceRangeFilter />
      <TurnRangeFilter />
    </FilterPanelContainer>
  );
};

export default FilterPanel;
