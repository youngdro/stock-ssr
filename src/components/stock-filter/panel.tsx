import React, { useState } from 'react';
import { Form } from 'antd';
// import { ICurrentStock } from '../../api/stock/tools/interface';
// import { UseFilterProps } from '../../hooks/interface';
import { FilterPanelContainer } from './styled';
import { PriceRangeFilter, TurnRangeFilter, PctChgRangeFilter } from './range-filters';

interface FilterPanelProps {}

const FilterPanel: React.FC<FilterPanelProps> = () => {
  const [values, setValues] = useState({});
  const handleFormChange = (changedFields) => {
    setValues((values) => ({ ...values, ...changedFields }));
    // console.log('handleFormChange', changedFields);
  };
  const onDisableChange = (disabled, key) => {};
  return (
    <FilterPanelContainer>
      <Form
        onValuesChange={handleFormChange}
        initialValues={{
          price: [100, 1000],
        }}
      >
        <Form.Item name="price">
          <PriceRangeFilter onDisableChange={(disabled) => onDisableChange(disabled, 'price')} />
        </Form.Item>
        <Form.Item name="turn">
          <TurnRangeFilter onDisableChange={(disabled) => onDisableChange(disabled, 'turn')} />
        </Form.Item>
        <Form.Item name="pctChg">
          <PctChgRangeFilter onDisableChange={(disabled) => onDisableChange(disabled, 'pctChg')} />
        </Form.Item>
      </Form>
    </FilterPanelContainer>
  );
};

export default FilterPanel;
