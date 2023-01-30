import React, { useState } from 'react';
import { Form, Button } from 'antd';
import { ICurrentStock } from '../../api/stock/tools/interface';
// import { UseFilterProps } from '../../hooks/interface';
import { FilterPanelContainer } from './styled';
import { PriceRangeFilter, TurnRangeFilter, PctChgRangeFilter } from './range-filters';

interface FilterPanelProps {
  onChange?: (values: any) => void;
}

const FilterComponentsMap = {
  price: PriceRangeFilter,
  turn: TurnRangeFilter,
  pctChg: PctChgRangeFilter,
};

const DisabledKeyMap = {};

const FilterPanel: React.FC<FilterPanelProps> = (props) => {
  const { onChange } = props;
  const [, setValues] = useState({});
  const handleFormChange = (changedFields) => {
    setValues((values) => {
      const mergedValues = { ...values, ...changedFields };
      const filterValues = Object.keys(mergedValues).reduce((res, key) => {
        if (!DisabledKeyMap[key]) {
          res[key] = mergedValues[key];
        }
        return res;
      }, {});
      // const filter = (item: ICurrentStock) => {
      //   item.trade
      // };
      // onChange && onChange(filterValues);
      return mergedValues;
    });
  };
  const onDisableChange = (disabled, key) => {
    DisabledKeyMap[key] = disabled;
  };
  return (
    <FilterPanelContainer>
      <Form onValuesChange={handleFormChange}>
        {
          Object.keys(FilterComponentsMap).map((filterKey) => {
            const Component = FilterComponentsMap[filterKey];
            return (
              <Form.Item name={filterKey} key={`filter-item-${filterKey}`}>
                <Component onDisableChange={(disabled) => onDisableChange(disabled, filterKey)} />
              </Form.Item>
            );
          })
        }
      </Form>
    </FilterPanelContainer>
  );
};

export default FilterPanel;
