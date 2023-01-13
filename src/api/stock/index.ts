import { Api, Get, Params, useContext } from '@midwayjs/hooks';
import type { Context } from '@midwayjs/koa';
import { StockFetcher } from './tools/fetcher';

const stockFetcher = new StockFetcher();

export const getTest = Api(Get(), async () => {
  return new Date().toString();
});

export const getCurrentAllStock = Api(
  Get('/getCurrentAllStock'),
  async () => {
    return stockFetcher.getCurrentAllStock();
  }
);

export const getLatestDailyHis = Api(
  Get('/getLatestDailyHis/:code'),
  Params<{ code: string }>(),
  async () => {
    const ctx = useContext<Context>();
    const { code } = ctx.params;
    return await stockFetcher.getLatestDailyHis(code);
  }
);
