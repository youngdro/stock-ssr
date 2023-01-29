import React, { useState, useEffect } from 'react';
import { Slider, Switch, InputNumber } from 'antd';
import {
  RangeSelectorContainer,
  RangeSelectorContent,
  RangeSelectorTitle,
  RangeSelectorLabel,
  AlignCenterFlexBox,
} from './styled';

type RangeType = [number, number];

interface RangeSelectorProps {
  min: number;
  max: number;
  isPercent?: boolean;
  marks?: Record<string | number, React.ReactNode | object>;
  label: string;
  splitNum?: number;
  value?: RangeType;
  defaultValue?: RangeType;
  onChange?: (value: RangeType) => void;
  formatter?: (value: RangeType) => RangeType;
  inputNumberOptions?: {
    prefix?: string;
    formatter?: (val: string | number) => string;
    parser?: (val: string | number) => string;
    precision?: number;
  };
}

const RangeSelector: React.FC<RangeSelectorProps> = (props) => {
  const { defaultValue, value: propsValue, isPercent, onChange, min: propsMin, max: propsMax, marks, label, inputNumberOptions: options = {} } = props;
  const min = isPercent ? propsMin * 100 : propsMin;
  const max = isPercent ? propsMax * 100 : propsMax;
  const _defaultValue: RangeType = [min, max];
  const [value, setValue] = useState(propsValue || defaultValue || _defaultValue);
  const [disabled, setDisabled] = useState(false);
  const inputNumberOptions = {
    ...options,
    style: { width: 90 },
    ...(isPercent ? {
      formatter: (value) => `${value}%`,
      parser: (value) => value!.replace('%', ''),
    } : {}),
  };
  console.log('value', value)
  const handleSwitchChange = (checked) => setDisabled(!checked);
  const handleSliderChange = (valueArr) => {
    !propsValue && setValue(valueArr);
    onChange && onChange(isPercent ? valueArr.map((item) => (item / 100)) : valueArr);
  };

  useEffect(() => {
    propsValue && setValue(propsValue);
  }, [JSON.stringify(propsValue)]);

  return (
    <RangeSelectorContainer>
      <RangeSelectorTitle>
        <AlignCenterFlexBox>
          <Switch size="small" checked={!disabled} onChange={handleSwitchChange} />
          <RangeSelectorLabel disabled={disabled}>{label}</RangeSelectorLabel>
        </AlignCenterFlexBox>
        <AlignCenterFlexBox>
          <InputNumber
            {...inputNumberOptions}
            value={value[0]}
            min={min}
            max={value[1]}
            disabled={disabled}
            onChange={(start: number) => setValue([start, value[1]])}
          />
          &nbsp;~&nbsp;
          <InputNumber
            {...inputNumberOptions}
            value={value[1]}
            min={value[0]}
            max={max}
            disabled={disabled}
            onChange={(end: number) => setValue([value[0], end])}
          />
        </AlignCenterFlexBox>
      </RangeSelectorTitle>
      <RangeSelectorContent>
        <Slider
          range={{ draggableTrack: true }}
          min={min}
          max={max}
          marks={marks}
          disabled={disabled}
          defaultValue={defaultValue}
          tooltip={{ placement: 'bottom' }}
          onChange={handleSliderChange}
          value={value}
        />
      </RangeSelectorContent>
    </RangeSelectorContainer>
  );
};

export default RangeSelector;