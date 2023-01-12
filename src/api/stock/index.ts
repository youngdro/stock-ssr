import { Api, Get, Params, useContext } from '@midwayjs/hooks';
import type { Context } from '@midwayjs/koa';
import dip from 'dipiper';
import { StockDataSource } from '../../tools/stock/dataSource';

const stockDataSource = new StockDataSource();

export const getTest = Api(Get(), async () => {
  return new Date().toString();
});

export const getStockList = Api(
  Get('/getStockList'),
  async () => {
    return stockDataSource.getStockList();
  }
);


export const getSymbolCode = Api(
  Get('/getSymbolCode/:code'),
  Params<{ code: string }>(),
  async () => {
    const ctx = useContext<Context>();
    const { code } = ctx.params;
    return stockDataSource.getSymbolCode(code);
  }
);


export const getMonthHis = Api(
  Get('/getMonthHis/:code'),
  Params<{ code: string }>(),
  async () => {
    const ctx = useContext<Context>();
    const { code } = ctx.params;
    return await dip.stock.trading.getMonthHis(code);
  }
);