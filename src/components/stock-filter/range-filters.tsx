import React, { useState } from 'react';
import RangeSelector from './range-selector';

export type RangeValueType = [number, number];

interface RangeFilterItemProps {
  value?: RangeValueType;
  defaultValue?: RangeValueType;
  onChange?: (value: RangeValueType) => void;
}

export const PriceRangeFilter: React.FC<RangeFilterItemProps> = (props) => {
  const { value, defaultValue, onChange } = props;
  const marks = { 0: '0', 500: '500', 1000: '1000', 1500: '1500', 2000: '2000' };
  const inputNumberOptions = { prefix: '￥' };
  return (
    <RangeSelector
      min={0}
      max={2000}
      label="价格区间"
      marks={marks}
      value={value}
      defaultValue={defaultValue}
      onChange={onChange}
      inputNumberOptions={inputNumberOptions}
      
    />
  );
};

export const TurnRangeFilter: React.FC<RangeFilterItemProps> = (props) => {
  const { value, defaultValue, onChange } = props;
  const marks = { 0: '0', 50: '50', 100: '100' };
  return (
    <RangeSelector
      min={0}
      max={1}
      label="换手率区间"
      marks={marks}
      isPercent
      value={value}
      defaultValue={defaultValue}
      onChange={onChange}
    />
  );
};
