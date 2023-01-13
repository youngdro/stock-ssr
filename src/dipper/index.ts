import finance from './stock/finance';
import index from './stock/index';
import symbols from './stock/symbols';
import trading from './stock/trading';
import fundflow from './stock/fundflow';

require("events").EventEmitter.defaultMaxListeners = 0;

export default {
    stock: {
        finance,
        index,
        symbols,
        trading,
        fundflow,
    },
};
