import axios from 'axios';
import fs from 'fs';
import path from 'path';
// import dayjs from 'dayjs';
import fsExtra from 'fs-extra';
import dip from 'dipiper';

import { IKLineItem } from '../../interface/stock';

function Cache() {
  return (_t, name, descripter) => {
    const original = descripter.value;
    descripter.value = async function (...args) {
      const cacheDir = path.resolve(path.resolve('.'), './cache');
      const cachePath = path.resolve(
        cacheDir,
        `./${[...args, name].join('/')}.json`
      );
      if (fs.existsSync(cachePath)) {
        return require(cachePath);
      } else {
        const data = await original.apply(this, args);
        await fsExtra.outputFile(cachePath, JSON.stringify(data));
        return data;
      }
    };
  };
}

export class StockDataSource {
  symbolCodeMap = {};

  @Cache()
  async getStockList() {
    let result = [];
    for (let i = 1; i <= 50; i++) {
      const { data } = await axios.get(
        `http://vip.stock.finance.sina.com.cn/quotes_service/api/json_v2.php/Market_Center.getHQNodeData?page=${i}&num=100&sort=symbol&asc=1&node=hs_a&_s_r_a=init`
      );
      const tmp = data.map(item => {
        const symbol = {
          symbol: item.symbol,
          code: item.code,
          name: item.name,
        };
        return symbol;
      });
      result = result.concat(tmp);
    }
    return result;
  }

  async getSymbolCode(code: string) {
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

  // 按年份获取个股日线历史数据
  @Cache()
  async getDailyHis(code: string, year: string): Promise<IKLineItem[]> {
    const symbolCode = await this.getSymbolCode(code);
    return dip.stock.trading.getDailyHis(year.substr(-2), symbolCode);
  }
}