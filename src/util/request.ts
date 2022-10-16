import axios, { AxiosRequestConfig } from 'axios';

const fetch = (url: string, params: any, method = 'post') => {
  return new Promise((resolve, reject) => {
    let config:AxiosRequestConfig = {
      url: url,
      method: method,
    }
    if (method.match(/get|delete|head/)) {
      config.params = params
    } else {
      config.data = params
    }
    axios(config).then(res => resolve(res.data), err => {
      if (err.response) {
        resolve(err.response.data);
      } else {
        resolve({　errors: err　});
      }
    })
  })
}

module.exports =  ((array) => {
  return array.reduce((a, b) => {
    a[b] = (url, params) => fetch(url, params, b)
    return a
  }, {})
})(['get', 'post', 'delete', 'patch', 'put']);


// https://vip.stock.finance.sina.com.cn/quotes_service/api/json_v2.php/Market_Center.getHQNodeData?page=1&num=10000&sort=symbol&asc=1&node=sz_a&_s_r_a=init