// import dayjs from 'dayjs';
import { StockDataSource } from '../dataSource';

const stockDataSource = new StockDataSource();

export const checkStockUp = async (code: string, date: string) => {
  const dailyHis = await stockDataSource.getDailyHis(code, date.split('-')[0]);
  const curIndex = dailyHis.findIndex(item => (item.date === date));
  const curItem = dailyHis[curIndex];
  return [1, 2, 3, 4, 5, 6, 7, 8, 9].map((index) => {
    const nextItem = dailyHis[curIndex + index];
    const up = +nextItem.close > +curItem.close;
    const rate = parseFloat(((+nextItem.close - +curItem.close) / +curItem.close * 100).toFixed(2));
    return {
      next: index,
      up,
      rate,
      code,
    };
  });
};

export const verifyAttentionStockList = async (date: string) => {
  const source = await stockDataSource.getAttentionStockList(date);
  const list = source.filter(item => (item.analysis.weight >= 6 && item.analysis.weight <= 6));
  console.log('list', list.length);
  const map = {};
  for (let i = 0; i < list.length; i++) {
    const item = list[i];
    const res = await checkStockUp(item.code, date);
    res.forEach((a) => {
      if (!map[a.next]) {
        map[a.next] = { codes: [], upCodes: [], downCodes: [], hitRate: null };
      }
      map[a.next].codes.push(item.code);
      a.up && map[a.next].upCodes.push({ code: item.code, rate: a.rate });
      !a.up && map[a.next].downCodes.push({ code: item.code, rate: a.rate });
    });
  }
  return Object.keys(map).map((next) => {
    const item = map[next];
    const hitRate = parseFloat(((item.upCodes.length / item.codes.length) * 100).toFixed(2));
    return {
      next,
      codes: item.codes,
      upCodes: item.upCodes,
      downCodes: item.downCodes,
      hitRate,
    }
  });
}
