/*---------------------------------------------------------------------------------------------
 * 资金流向数据
 *--------------------------------------------------------------------------------------------*/
import format from 'string-format';
import dataSource from '../common/dataSource';
import digger from '../utils/digger';

const fundflow = {
    /**
     *  @method
     *  @param {string} code 股票代码
     * 	@returns {json} 个股资金流向历史记录
     */
    getStockTrendHis: async (code) => {
        let rec_num = await digger(format(dataSource.stock_fundflow.num_url, code));
        let list_obj = await digger(format(dataSource.stock_fundflow.url, eval(<string>rec_num), code));
        return {
            code: code,
            date: eval(<string>list_obj)
        };
    }
};

export default fundflow;
