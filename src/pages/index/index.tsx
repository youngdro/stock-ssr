import React from "react";
import { Button } from 'antd';
import { getCurrentAllStock, getLatestDailyHis } from '../../api/stock';

export default () => {
  const _getCurrentAllStock = () => {
    getCurrentAllStock();
  };

  const _getLatestDailyHis = () => {
    getLatestDailyHis({ params: { code: 'sz.300769' }});
  };

  return (
    <div>index
      <Button onClick={_getCurrentAllStock}>getCurrentAllStock</Button>
      <Button onClick={_getLatestDailyHis}>getLatestDailyHis</Button>
    </div>
  );
};