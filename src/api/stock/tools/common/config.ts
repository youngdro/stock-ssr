export const k = ['date', 'code', 'open', 'high', 'low', 'close', 'preclose', 'volume', 'amount', 'adjustflag', 'turn', 'tradestatus', 'pctChg', 'peTTM', 'psTTM', 'pcfNcfTTM', 'pbMRQ', 'isST'];

export enum FieldsNameEnum {
    date = '日期', // 格式：YYYY-MM-DD
    code = '证券代码', // 格式：sh.600000。sh：上海，sz：深圳
    open = '开盘价', // 精度：小数点后4位；单位：人民币元
    high = '最高价', // 精度：小数点后4位；单位：人民币元
    low = '最低价', // 精度：小数点后4位；单位：人民币元
    close = '收盘价', // 精度：小数点后4位；单位：人民币元
    preclose = '昨日收盘价', // 精度：小数点后4位；单位：人民币元
    volume = '成交数量', // 单位：股
    amount = '成交金额', // 精度：小数点后4位；单位：人民币元
    adjustflag = '复权状态', // 1：不复权 2：前复权 3：后复权
    turn = '换手率', // 精度：小数点后6位；单位：%
    tradestatus = '交易状态', // 1：正常交易 0：停牌
    pctChg = '涨跌幅', //（百分比）日涨跌幅=[(指定交易日的收盘价-指定交易日前收盘价)/指定交易日前收盘价]*100%
    peTTM = '滚动市盈率', // (指定交易日的股票收盘价/指定交易日的每股盈余TTM)=(指定交易日的股票收盘价*截至当日公司总股本)/归属母公司股东净利润TTM
    pbMRQ = '市净率', // (指定交易日的股票收盘价/指定交易日的每股净资产)=总市值/(最近披露的归属母公司股东的权益-其他权益工具)
    psTTM = '滚动市销率', // (指定交易日的股票收盘价/指定交易日的每股销售额)=(指定交易日的股票收盘价*截至当日公司总股本)/营业总收入TTM
    pcfNcfTTM = '滚动市现率', // (指定交易日的股票收盘价/指定交易日的每股现金流TTM)=(指定交易日的股票收盘价*截至当日公司总股本)/现金以及现金等价物净增加额TTM
    isST = '是否ST股', // 1是，0否
}

const defaultFields = ['date', 'code', 'open', 'high', 'low', 'close', 'preclose', 'volume', 'amount', 'adjustflag', 'turn', 'tradestatus', 'pctChg', 'peTTM', 'psTTM', 'pcfNcfTTM', 'pbMRQ', 'isST'];
const weekMonthFields = ['date', 'code', 'open', 'high', 'low', 'close', 'preclose', 'volume', 'amount', 'adjustflag', 'turn', 'pctChg'];
const minuteFields = ['date', 'time', 'code', 'open', 'high', 'low', 'close', 'volume', 'amount', 'adjustflag'];

export const kFrequencyFieldsMap = {
    d: defaultFields,
    w: weekMonthFields,
    m: weekMonthFields,
    '5': minuteFields,
    '15': minuteFields,
    '30': minuteFields,
    '60': minuteFields,
};