import styled from "styled-components";
// import { Card } from 'antd';

export const AlignCenterFlexBox = styled.div`
  display: flex;
  align-items: center;
`;

export const Container = styled.div`
`;

export const RangeSelectorContainer = styled.div`
`;

export const RangeSelectorTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

export const RangeSelectorLabel = styled.span`
  white-space: nowrap;
  margin-left: 8px;
  margin-right: 8px;
  ${(props) => props.disabled ? 'color: rgba(199,199,199,1)' : 'color: rgba(0,0,0,0.8)'}
`;

export const RangeSelectorContent = styled.div`
  width: 100%;
`;

export const FilterPanelContainer = styled.div`
`;
