import fs from 'fs';
import path from 'path';
// import dayjs from 'dayjs';
import fsExtra from 'fs-extra';

export function LocalCache(dir = '', options = {}) {
  return (_t, name, descripter) => {
    const original = descripter.value;
    descripter.value = async function (...args) {
      const cacheDir = path.resolve(path.resolve('.'), './.cache');
      const cachePath = path.resolve(
        cacheDir,
        dir,
        `./${[...args, name].join('/')}.json`
      );

      console.log('cachePath', cachePath, dir);
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