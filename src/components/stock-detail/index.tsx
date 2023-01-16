import React from "react";
import { Button, Statistic, Row, Col } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { IKLineItem, IKlineParams } from '../../api/stock/tools/interface';
import { Container } from './styled';

interface StockDetailProps {
    code: string;
}

const StockDetail: React.FC<StockDetailProps> = ({}) => {
  return (
    <Container>
      
    </Container>
  );
};

export default StockDetail;