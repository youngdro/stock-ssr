export interface IKlineParams {
  code: string;
  fields?: string[];
  startDate: string;
  endDate: string;
  frequency: string;
  adjustflag?: string;
}

export interface IKLineItem {
  date: string; // 交易日期
  code?: string; // 股票代码
  open: string; // 开盘价
  close: string; // 收盘价
  high: string; // 最高价
  low: string; // 最低价
  preclose: string; // 昨日收盘价
  volume: string; // 成交量
  amount: string; // 成交额
  adjustflag: string; // 复权状态
  turn?: string; // 换手率
  tradestatus?: string; // 交易状态
  pctChg: string; // 涨跌幅
  peTTM?: string; // 滚动市盈率
  pbMRQ?: string; // 市净率
  psTTM?: string; //滚动市销率
  pcfNcfTTM?: string; // 滚动市现率
  isST?: string; // 是否ST股
}

export interface ICurrentStock {
  date: string; // 交易日期
  code: string; // 股票编码
  name: string; // 股票名称
  open: string; // 开盘价
  close: string; // 收盘价
  trade: string; // 交易价
  high: string; // 最高价
  low: string; // 最低价
  volume: string; // 成交量
  amount: number; // 成交额
  pctChg: number; // 涨跌幅
  turn: number; // 换手率
}
