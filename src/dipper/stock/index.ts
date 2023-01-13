/*---------------------------------------------------------------------------------------------
 *  行业、概念、地域指数及成分
 *--------------------------------------------------------------------------------------------*/

import dayjs from 'dayjs';
import format from 'string-format';
import dataSource from '../common/dataSource';
import digger from '../utils/digger';

let scrubber = {
    formatHis: (hisData) => {
        let his_obj = JSON.parse(hisData.substring(hisData.indexOf("(") + 1, hisData.length - 2));
        let result = his_obj.data.klines.map(ele => {
            let kline = ele.split(",");
            return {
                date: kline[0],
                open: kline[1],
                close: kline[2],
                high: kline[3],
                low: kline[4],
                volume: kline[5],
                amount: kline[6],
                swing: kline[7]
            }
        });
        return result;
    },
    formatEle: (hisData) => {
        let his_obj = JSON.parse(hisData.substring(hisData.indexOf("(") + 1, hisData.length - 2));
        let result = his_obj.data.diff.map(ele => {
            return {code: ele.f12, name: ele.f14}
        });
        return result;
    }
}

let index = { /**
     * @param {code} 行业、概念、地域板块代码
     */
    getMonthHis: async (code) => {
        let endDate = dayjs().format("YYYYMMDD");
        let his_str = await digger(format(dataSource.stock_boardk.url, code, dataSource.stock_boardk.lt.month, endDate));
        return scrubber.formatHis(his_str);
    },
    /**
     * @param {code} 行业、概念、地域板块代码
     */
    getWeekHis: async (code) => {
        let endDate = dayjs().format("YYYYMMDD");
        let his_str = await digger(format(dataSource.stock_boardk.url, code, dataSource.stock_boardk.lt.week, endDate));
        return scrubber.formatHis(his_str);
    },
    /**
     * @param {code} 行业、概念、地域板块代码
     */
    getDailyHis: async (code) => {
        let endDate = dayjs().format("YYYYMMDD");
        let his_str = await digger(format(dataSource.stock_boardk.url, code, dataSource.stock_boardk.lt.day, endDate));
        return scrubber.formatHis(his_str);
    },
    /**
     * @param {code} 行业、概念、地域板块代码
     */
    getComponents: async (code) => {
        let his_str = await digger(format(dataSource.stock_boardele.url, code));
        return scrubber.formatEle(his_str);
    }
}

export default index;
