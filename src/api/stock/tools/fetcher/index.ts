import { LocalCache } from '../decorator';
import { queryCurrentAllStock, queryHistoryKLine } from './dataSource';
import { IKLineItem } from '../interface';
import dayjs from 'dayjs';
import path from 'path';
import fs from 'fs';
import fsExtra from 'fs-extra';

export class StockFetcher {
  cacheDir: string;
  dateFormat: string;
  constructor() {
    this.cacheDir = path.resolve(path.resolve('.'), './.cache');
    this.dateFormat = 'YYYY-MM-DD';
  }

  private checkLatestHisCache(cachePath: string, frequency: 'd' | 'w' | 'm'): { data: IKLineItem[], needAdd: boolean, startDate?: string, endDate?: string } {
    const curDate = dayjs().format(this.dateFormat);
    if (fs.existsSync(cachePath)) {
      const data = <IKLineItem[]>require(cachePath);
      const lastItem = data[data.length - 1];
      if (lastItem && typeof lastItem === 'object') {
        if (lastItem.date < curDate) {
          return {
            data: require(cachePath),
            needAdd: true,
            startDate: dayjs(lastItem.date).add(1, frequency).format(this.dateFormat),
            endDate: curDate,
          };
        }
        return { data: require(cachePath), needAdd: false };
      }
    }
    // 最近一年
    return {
      data: [],
      needAdd: true,
      startDate: dayjs().subtract(1, 'year').format(this.dateFormat),
      endDate: dayjs().format(this.dateFormat),
    };
  }

  async getLatestDailyHis(code: string) {
    const frequency = 'd';
    const cachePath = path.resolve(this.cacheDir, code, 'latestDailyHis.json');
    const { data = [], needAdd, startDate, endDate } = this.checkLatestHisCache(cachePath, frequency);
    if (data && data.length) {
      if (!needAdd) return data;
    }
    const addData = await queryHistoryKLine({ code, startDate, endDate, frequency });
    const latestData = data.concat(addData);
    await fsExtra.outputFile(cachePath, JSON.stringify(latestData));
    return latestData;
  }

  @LocalCache()
  async getCurrentAllStock() {
    return queryCurrentAllStock();
  }

  async getDailyHis(params: { code: string, startDate: string, endDate: string }): Promise<IKLineItem[]> {
    return queryHistoryKLine({ ...params, frequency: 'd' });
  }

  async getWeekHis(params: { code: string, startDate: string, endDate: string }): Promise<IKLineItem[]> {
    return queryHistoryKLine({ ...params, frequency: 'w' });
  }

  async getMonthHis(params: { code: string, startDate: string, endDate: string }): Promise<IKLineItem[]> {
    return queryHistoryKLine({ ...params, frequency: 'm' });
  }
}