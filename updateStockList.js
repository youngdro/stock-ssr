const axios = require('axios');;
const fs = require('fs');

(async () => {
    let result = [];
    for (let i = 1; i <= 50; i++) {
        const { data } = await axios.get(`http://vip.stock.finance.sina.com.cn/quotes_service/api/json_v2.php/Market_Center.getHQNodeData?page=${i}&num=100&sort=symbol&asc=1&node=hs_a&_s_r_a=init`)
        const tmp = data.map((item) => {
            let symbol = {
                symbol: item.symbol,
                code: item.code,
                name: item.name
            };
            console.log(symbol);
            return symbol;
        });
        result = result.concat(tmp);
    }
    fs.writeFile('./stockList.json', JSON.stringify(result), () => {
        console.log('updateStockList success');
    });
})();

