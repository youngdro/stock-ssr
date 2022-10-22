import dayjs from 'dayjs';
import { StockDataSource } from '../dataSource';

const stockDataSource = new StockDataSource();

export const checkStockUp = async (code: string, date: string) => {
  const year = date.split('-')[0];
  const dailyHis = await stockDataSource.getDailyHis(code, date.split('-')[0]);
};
