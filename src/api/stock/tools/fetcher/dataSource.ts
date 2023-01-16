import { spawn } from 'child_process';
import puppeteer from 'puppeteer';
import path from 'path';
import axios from 'axios';
import { kFrequencyFieldsMap } from '../common/config';
import { IKlineParams, IKLineItem, ICurrentStock } from '../interface';
import dayjs from 'dayjs';

const runPython = (_path: string, ...args) => {
    const py = spawn('python3', [_path, ...args]);
    return new Promise((resolve, reject) => {
        let dataStr = '';
        py.stdout.on('data', (res) => {
            dataStr += res.toString().replace(/(login success!)|(logout success!)/g, '').replace(/'/g, '"').trim();
        });
        py.stdout.on('end', () => {
            try {
              resolve(JSON.parse(dataStr));
            } catch (err) {
              reject(err);
            }
        });
        py.stderr.on('data', (err) => {
          console.log('err', err);
          reject(err.toString())
        });
    });
};

export const puppeteerFetch = async (url: string) => {
  return await puppeteer.launch().then(async browser => {
    const page = await browser.newPage();
    await page.goto(url);
    let r = await page.$$eval('pre', pre => pre[0].innerHTML);
    await browser.close();
    try {
      return JSON.parse(r);
    } catch (err) {
      throw err;
    }
  });
};

export const queryCurrentAllStock = async (): Promise<ICurrentStock[]> => {
    let result = [];
    const date = dayjs().format('YYYY-MM-DD');
    for (let i = 1; i <= 60; i++) {
      const data = await puppeteerFetch(
        `http://vip.stock.finance.sina.com.cn/quotes_service/api/json_v2.php/Market_Center.getHQNodeData?page=${i}&num=100&sort=symbol&asc=1&node=hs_a&_s_r_a=init`
      );
      const tmp = data.map(item => {
        const stock = {
          ...item,
          date,
          close: item.sell,
          code: item.symbol.replace(/^([a-z]+)/, '$1.'),
          pctChg: item.changepercent,
          turn: item.turnoverratio,
        };
        delete item.symbol;
        delete stock.changepercent;
        delete stock.sell;
        delete stock.turnoverratio;
        return stock;
      });
      result = result.concat(tmp);
    }
    return result;
  }

export const queryHistoryKLine = async (params: IKlineParams): Promise<IKLineItem[]> => {
    const _path = path.join(__dirname, './py/query_history_k_data.py');
    const { code, fields, startDate, endDate, frequency, adjustflag } = params;
    const defaultFields = kFrequencyFieldsMap[frequency];
    const _fields = fields || defaultFields;
    const fieldsStr = (fields || defaultFields).join(',');
    const data = <string[]>await runPython(_path, code, fieldsStr, startDate, endDate, frequency, adjustflag || '3');
    const res = <IKLineItem[]>data.map((item) => {
      return _fields.reduce((obj, key, i) => {
        obj[key] = item[i];
        return obj;
      }, {});
    })
    return res;
};

export const queryAllStock = async (date: string) => {
    const _path = path.join(__dirname, './py/query_all_stock.py');
    const data = await runPython(_path, date);
    return data;
};
