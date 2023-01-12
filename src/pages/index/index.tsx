import React from "react";
import { Button } from 'antd';
import { getStockList } from '../../api/stock';

export default () => {
  const _getStockList = () => {
    getStockList();
  };

  return (
    <div>index
      <Button onClick={_getStockList}>getStockList</Button>
    </div>
  );
};