import React from "react";
import { Modal, Statistic, Row, Col } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { ICurrentStock } from '../../api/stock/tools/interface';
import { Container } from './styled';
import StockDetail from '../stock-detail';

interface StockCardProps {
  stock: ICurrentStock;
  index: number;
}

const StockCard: React.FC<StockCardProps> = ({ stock, index }) => {
  const { name, close, low, high, pctChg, code, turn } = stock;
  const valueStyle = { fontSize: 16 };
  const subTitleStyle = { fontSize: 14, fontWeight: 'normal', color: 'rgba(0, 0, 0, 0.45)', marginLeft: 4 };
  const pctChgStyle = {
    fontSize: 16,
    color: pctChg < 0 ? '#3f8600' : '#cf1322',
  };
  const Prefix = pctChg < 0 ? ArrowDownOutlined : ArrowUpOutlined;
  const Extra = (<Statistic value={pctChg} precision={2} suffix="%" valueStyle={pctChgStyle} prefix={<Prefix />} />);
  const Title = [<span>{name}</span>, <span style={subTitleStyle}>{code}</span>];
  const commonStatisticProps = { precision: 2, valueStyle };
  const onClick = () => {
    Modal.confirm({
      bodyStyle: {},
      footer: null,
      maskClosable: true,
      width: 1000,
      icon: null,
      title: <div>{stock.name} <span style={subTitleStyle}>{stock.code}</span></div>,
      content: <StockDetail code={stock.code} />,
    });
  };

  return (
    <Container hoverable bodyStyle={{ padding: 12 }} title={Title} extra={Extra} key={`StockCard-${index}`} onClick={onClick}>
      <Row gutter={8}>
        <Col span={6}>
          <Statistic title="现价" value={close} precision={2} valueStyle={{ ...valueStyle, fontWeight: 'bold' }} />
        </Col>
        <Col span={6}>
          <Statistic title="最低" value={low} {...commonStatisticProps} />
        </Col>
        <Col span={6}>
          <Statistic title="最高" value={high} {...commonStatisticProps} />
        </Col>
        <Col span={6}>
          <Statistic title="换手率" value={turn} {...commonStatisticProps} suffix="%" />
        </Col>
      </Row>
    </Container>
  );
};

export default StockCard;