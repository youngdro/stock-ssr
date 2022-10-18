import { Provide } from '@midwayjs/decorator';
import dip from 'dipiper';
import {
  IStockItem,
  IStockBoard,
  IGuideLineData,
  IKLineItem,
  IMin,
  ITrendItem,
} from '../interface';
import { StockDataSource } from '../tools/dataSource';
import { StockAnalysis } from '../tools/analysis';
import dayjs from 'dayjs';

const stockDataSource = new StockDataSource();

@Provide()
export class StockService {
  symbolCodeMap = {}

  async getSymbolCode(code: string): Promise<string> {
    if (!/^[a-z]/.test(code)) {
      if (Object.keys(this.symbolCodeMap).length < 1) {
        const list = await this.getStockList();
        const codeMap = list.reduce((a, b) => {
          a[b.code] = b.symbol;
          return a;
        }, {});
        this.symbolCodeMap = codeMap;
      }
      return this.symbolCodeMap[code];
    }
    return code;
  }

  // 获取股票列表
  async getStockList(): Promise<IStockItem[]> {
    return await stockDataSource.getStockList();
  }

  // 获取个股所属板块
  async getBoards(code: string): Promise<IStockBoard[]> {
    return dip.stock.symbols.getBoards(code);
  }

  // 获取个股财务指标
  async getGuideLine(code: string, year: string): Promise<IGuideLineData> {
    return dip.stock.finance.getGuideLine(code, year);
  }

  // 按年份获取个股日线历史数据
  async getDailyHis(code: string, year: string): Promise<IKLineItem[]> {
    return await stockDataSource.getDailyHis(code, year);
  }

  // 获取个股周线历史数据
  async getWeekHis(code: string): Promise<IKLineItem[]> {
    const symbolCode = await this.getSymbolCode(code);
    return dip.stock.trading.getWeekHis(symbolCode);
  }

  // 获取个股月线历史数据
  async getMonthHis(code: string): Promise<IKLineItem[]> {
    const symbolCode = await this.getSymbolCode(code);
    return dip.stock.trading.getMonthHis(symbolCode);
  }

  // 获取个股分时数据（仅当天）
  async getMin(code: string): Promise<IMin[]> {
    const symbolCode = await this.getSymbolCode(code);
    return dip.stock.trading.getMin(symbolCode);
  }

  // 个股资金流向趋势
  async getStockTrendHis(code: string): Promise<ITrendItem[]> {
    const symbolCode = await this.getSymbolCode(code);
    return dip.stock.fundflow.getStockTrendHis(symbolCode);
  }

  async analysisStock(code: string, date: string): Promise<any> {
    const year = (date.match(/\d{2}(\d{2})-\d{2}-\d{2}/) || [])[1] || '22';
    const dailyHis = await this.getDailyHis(code, year);
    const stockAnalysis = new StockAnalysis();
    const targetIndex = dailyHis.findIndex(item => item.date === date);
    const list = dailyHis.slice(0, targetIndex + 1);
    console.log(list);
    return stockAnalysis.run(list);
  }

  async getAttentionStockList(date: string): Promise<IStockItem[]> {
    const stockList = await this.getStockList();
    const list = [];
    for (let i = 0; i < stockList.length; i++) {
      const stockItem = stockList[i];
      if (!/^sz/.test(stockItem.symbol)) continue;
      console.log(i);
      console.log(stockItem);
      try {
        const res = await this.analysisStock(stockItem.code, date || dayjs().format('YYYY-MM-DD'));
        if (res.weight >= 5) {
          list.push({
            ...stockItem,
            analysis: res,
          });
        }
      } catch (_err) {
        console.log('err', stockItem);
      }
    }
    return list;
  }
}
