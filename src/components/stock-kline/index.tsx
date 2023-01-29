import React from 'react';
import { Stock } from '@ant-design/plots';
import { IKLineItem } from '../../api/stock/tools/interface';

interface StockKLineProps {
  data: IKLineItem[];
}

const StockKLine: React.FC<StockKLineProps> = ({ data }) => {
  const list = data.map((item) => ({
    ...item,
    open: +item.open,
    close: +item.close,
    high: +item.high,
    low: +item.low,
  }));
  return (
    <Stock
      appendPadding={[0, 10, 0, 0]}
      xField="date"
      data={list}
      yField={['open', 'close', 'high', 'low']}
      slider={{}}
      meta={{
        open: { alias: '开盘价' },
        close: { alias: '收盘价' },
        high: { alias: '最高价' },
        low: { alias: '最低价' },
        volume: { alias: '成交量' },
      }}
      tooltip={{
        fields: ['open', 'close', 'high', 'low', 'volume'],
        crosshairs: {
          line: {
            style: {
              lineWidth: 0.5,
              stroke: 'rgba(0,0,0,0.25)',
            },
          },
          text: (type, defaultContent, items) => {
            let textContent;
            if (type === 'x') {
              const item = items[0];
              textContent = item ? item.title : defaultContent;
            } else {
              textContent = `${defaultContent.toFixed(2)}`;
            }
            return {
              position: type === 'y' ? 'start' : 'end',
              content: textContent,
              style: { fill: '#dfdfdf' },
            };
          },
          textBackground: {
            padding: [4, 8],
            style: {
              fill: '#363636',
            },
          },
        },
      }}
    />
  );
};

export default StockKLine;
