import { LocalCache, LocalCodeHistoryCache } from '../decorator';
import { queryCurrentAllStock, queryHistoryKLine } from './dataSource';
import { IKLineItem } from '../interface';
import dayjs from 'dayjs';
import path from 'path';
import fs from 'fs';
import fsExtra from 'fs-extra';

const cacheDir = path.resolve(path.resolve('.'), './.cache');
const cacheHistoryDir = path.resolve(cacheDir, 'history');

type FrequencyType = 'd' | 'w' | 'm';

export class StockFetcher {
  cacheDir: string;
  dateFormat: string;
  constructor() {
    this.dateFormat = 'YYYY-MM-DD';
  }

  private checkLatestHisCache(cachePath: string, frequency: FrequencyType): { data: IKLineItem[], needAdd: boolean, startDate?: string, endDate?: string } {
    const curDate = dayjs().format(this.dateFormat);
    if (fs.existsSync(cachePath)) {
      const data = <IKLineItem[]>require(cachePath);
      const lastItem = data[data.length - 1];
      if (lastItem && typeof lastItem === 'object') {
        if (lastItem.date < curDate) {
          const _startDate = dayjs(lastItem.date).add(1, frequency).format(this.dateFormat);
          if (_startDate >= curDate) {
            return { data: require(cachePath), needAdd: false };
          }
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
    // 默认拉取的最早时间
    const subtractNumMap = { d: 1, w: 2, m: 3 };
    return {
      data: [],
      needAdd: true,
      startDate: dayjs().subtract(subtractNumMap[frequency] || 1, 'year').format(this.dateFormat),
      endDate: dayjs().format(this.dateFormat),
    };
  }

  async getLatestHis(code: string, frequency: FrequencyType, cacheFileName: string) {
    const cachePath = path.resolve(cacheHistoryDir, code, cacheFileName);
    if (/^bj/.test(code)) return [];
    const { data = [], needAdd, startDate, endDate } = this.checkLatestHisCache(cachePath, frequency);
    if (data && data.length) {
      if (!needAdd) return data;
    }
    const addData = await queryHistoryKLine({ code, startDate, endDate, frequency });
    const latestData = data.concat(addData);
    await fsExtra.outputFile(cachePath, JSON.stringify(latestData));
    return latestData;
  }

  // 获取指定股票的的历史日K线（默认最近一年）
  async getLatestDailyHis(code: string) {
    return this.getLatestHis(code, 'd', 'latestDailyHis.json');
  }

  // 获取指定股票的的历史周K线（默认最近一年）
  async getLatestWeekHis(code: string) {
    return this.getLatestHis(code, 'w', 'latestWeekHis.json');
  }

  // 获取指定股票的的历史月K线（默认最近一年）
  async getLatestMonthHis(code: string) {
    return this.getLatestHis(code, 'm', 'latestMonthHis.json');
  }

  async updateAllLatestHis(frequency: FrequencyType) {
    const allStockList = await this.getCurrentAllStock();
    const getLatestMethodMap = {
      d: this.getLatestDailyHis.bind(this),
      w: this.getLatestWeekHis.bind(this),
      m: this.getLatestMonthHis.bind(this),
    };
    const getLatestMethod = getLatestMethodMap[frequency];
    for (let i = 0; i < allStockList.length; i++) {
      const stockItem = allStockList[i];
      try {
        await getLatestMethod(stockItem.code);
        console.log(
          `${frequency} success 【${i + 1}/${allStockList.length}】（%${Math.round(((i + 1) / allStockList.length) * 100)}）`,
          stockItem.code, stockItem.name
        );
      } catch (err) {
        console.log('getLatestHis err', stockItem.code, stockItem.name, err);
      }
    }
    return true;
  }

  // 获取所有股票的的历史日K线（默认最近1年）(新拉数据全部跑下来约3小时)
  async updateAllLatestDailyHis() {
    return this.updateAllLatestHis('d');
  }

  // 获取所有股票的的历史周K线（默认最近2年）
  async updateAllLatestWeekHis() {
    return this.updateAllLatestHis('w');
  }

  // 获取所有股票的的历史月K线（默认最近3年）
  async updateAllLatestMonthHis() {
    return this.updateAllLatestHis('m');
  }

  @LocalCache()
  async getCurrentAllStock() {
    return queryCurrentAllStock();
  }

  @LocalCodeHistoryCache(cacheHistoryDir, 'latestDailyHis.json')
  async getDailyHis(params: { code: string, startDate: string, endDate: string }): Promise<IKLineItem[]> {
    return queryHistoryKLine({ ...params, frequency: 'd' });
  }

  @LocalCodeHistoryCache(cacheHistoryDir, 'latestWeekHis.json')
  async getWeekHis(params: { code: string, startDate: string, endDate: string }): Promise<IKLineItem[]> {
    return queryHistoryKLine({ ...params, frequency: 'w' });
  }

  @LocalCodeHistoryCache(cacheHistoryDir, 'latestMonthHis.json')
  async getMonthHis(params: { code: string, startDate: string, endDate: string }): Promise<IKLineItem[]> {
    return queryHistoryKLine({ ...params, frequency: 'm' });
  }
}