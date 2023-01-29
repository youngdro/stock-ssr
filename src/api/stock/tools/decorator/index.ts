import fs from 'fs';
import path from 'path';
import fsExtra from 'fs-extra';
import { IKLineItem } from '../interface';

export function LocalCache(dir = '', options = {}) {
  return (_t, name, descripter) => {
    const original = descripter.value;
    descripter.value = async function (...args) {
      const cacheDir = path.resolve(path.resolve('.'), './.cache');
      const cachePath = path.resolve(cacheDir, dir, `./${[...args, name].join('/')}.json`);
      if (fs.existsSync(cachePath)) {
        console.log('cachePath', cachePath, dir);
        return require(cachePath);
      } else {
        const data = await original.apply(this, args);
        await fsExtra.outputFile(cachePath, JSON.stringify(data));
        return data;
      }
    };
  };
}

export function LocalCodeHistoryCache(cacheDir: string, cacheFileName: string) {
  return (_t, _name, descripter) => {
    const original = descripter.value;
    descripter.value = async function (
      params: { code: string; startDate: string; endDate: string },
      ...others
    ) {
      const { code, startDate, endDate } = params;
      const cachePath = path.resolve(cacheDir, code, cacheFileName);
      if (fs.existsSync(cachePath)) {
        const cacheData = <IKLineItem[]>require(cachePath);
        if (cacheData && cacheData.length) {
          const cacheStartDate = cacheData[0].date;
          const cacheEndDate = cacheData[cacheData.length - 1].date;
          if (startDate >= cacheStartDate && endDate <= cacheEndDate) {
            console.log('LocalCodeHistoryCache', code, startDate, endDate);
            return cacheData.filter((item) => item.date >= startDate && item.date <= endDate);
          }
        }
      }
      return await original.apply(this, [params, ...others]);
    };
  };
}
