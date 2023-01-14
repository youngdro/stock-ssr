import React from "react";
import { Button } from 'antd';
import {
  getCurrentAllStock, getLatestDailyHis,
  updateAllLatestDailyHis, updateAllLatestWeekHis,
  getDailyHis, getWeekHis,
} from '../../api/stock';

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
      <Button onClick={() => { updateAllLatestDailyHis() }}>拉取最近一年所有【日】K线</Button>
      <Button onClick={() => { updateAllLatestWeekHis() }}>拉取最近一年所有【周】K线</Button>
      <Button onClick={() => {
        getDailyHis({ query: { code: 'sz.300769', startDate: '2022-10-20', endDate: '2023-01-11' } })}}
      >getDailyHis</Button>
      <Button onClick={() => {
        getWeekHis({ query: { code: 'sz.300769', startDate: '2022-08-20', endDate: '2023-01-11' } })}}
      >getWeekHis</Button>
    </div>
  );
};