import { Api, Get, Query, Params, useContext } from '@midwayjs/hooks';
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

export const updateAllLatestDailyHis = Api(
  Get('/updateAllLatestDailyHis'),
  async () => {
    return await stockFetcher.updateAllLatestDailyHis();
  }
);

export const updateAllLatestWeekHis = Api(
  Get('/updateAllLatestWeekHis'),
  async () => {
    return await stockFetcher.updateAllLatestWeekHis();
  }
);

export const updateAllLatestMonthHis = Api(
  Get('/updateAllLatestMonthHis'),
  async () => {
    return await stockFetcher.updateAllLatestMonthHis();
  }
);

export const getDailyHis = Api(
  Get('/getDailyHis'),
  Query<{ code: string, startDate: string, endDate: string }>(),
  async () => {
    const ctx = useContext<Context>();
    const { code, startDate, endDate } = <{ code: string, startDate: string, endDate: string }>ctx.query;
    return await stockFetcher.getDailyHis({ code, startDate, endDate });
  }
);

export const getWeekHis = Api(
  Get('/getWeekHis'),
  Query<{ code: string, startDate: string, endDate: string }>(),
  async () => {
    const ctx = useContext<Context>();
    const { code, startDate, endDate } = <{ code: string, startDate: string, endDate: string }>ctx.query;
    return await stockFetcher.getWeekHis({ code, startDate, endDate });
  }
);

export const getMonthHis = Api(
  Get('/getMonthHis'),
  Query<{ code: string, startDate: string, endDate: string }>(),
  async () => {
    const ctx = useContext<Context>();
    const { code, startDate, endDate } = <{ code: string, startDate: string, endDate: string }>ctx.query;
    return await stockFetcher.getMonthHis({ code, startDate, endDate });
  }
);
