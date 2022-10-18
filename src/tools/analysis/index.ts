import path from 'path';
import Maths from 'mm_maths';
import { rules, IRuleItem } from './rules';
import { IKLineItem } from '../../interface/stock';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// 修正mm_maths里给String挂上的fullname方法
String.prototype.fullname = function (dir: string) {
    const file = this + '';
    return path.resolve(dir, file);
  };

export class StockAnalysis {
  maths: any;
  rules: IRuleItem[];

  constructor() {
    const maths = new Maths();
    maths.update(null, 'stock');
    this.maths = maths;
    this.rules = rules;
  }

  setConst(arr: IKLineItem[]) {
    // 最高价
    const H = [];
    // 最低价
    const L = [];
    // 开盘价
    const O = [];
    // 收盘价
    const C = [];
    // 成交量
    const V = [];
    // 涨跌幅
    const CHG = [];
    // 日期和时间
    const DATETIME = [];

    arr.map((item, i) => {
      const open = +item.open;
      const close = +item.close;
      const lastCode = i === 0 ? close : +arr[i - 1].close;
      const change = parseFloat(
        (i === 0
          ? ((close - open) / open) * 100
          : ((close - lastCode) / lastCode) * 100
        ).toFixed(2)
      );
      H.push(Number(item.high));
      L.push(Number(item.low));
      O.push(Number(item.open));
      C.push(Number(item.close));
      V.push(Number(item.volume));
      CHG.push(change);
      DATETIME.push(item.date);
    });

    this.maths.const = {
      H: H,
      HIGH: H,
      L: L,
      LOW: L,
      O: O,
      OPEN: O,
      C: C,
      CLOSE: C,
      V: V,
      VOL: V,
      CHG: CHG,
      DATETIME: DATETIME,
    };
  }

  filter(ret) {
    let tip = ' ' + ret.tip + ' ';
    let weight = ret.weight;
    const lt = this.rules;
    const len = lt.length;
    for (let i = 0; i < len; i++) {
      const o = lt[i];
      if (o.filter) {
        const arr = o.filter.split(' ');
        const count = arr.length;
        if (tip.indexOf(' ' + o.name + ' ') !== -1) {
          for (let n = 0; n < count; n++) {
            const name = arr[n];
            const key = ' ' + name + ' ';
            if (tip.indexOf(key) !== -1) {
              tip = tip.replace(key, ' ');
              weight -= lt.find(item => item.name === name).weight;
            }
          }
        }
      }
    }
    return {
      weight: weight,
      tip: tip.trim(),
    };
  }

  /**
   * 评论
   * @param {String} time 时态
   * @param {Number} weight 得分
   * @return {String} 返回
   */
  predict(time, weight) {
    let ret = '不明';
    if (weight === 0) {
      if (time === '今日') {
        if (weight > 0) {
          ret = '看好';
        } else if (weight < 0) {
          ret = '看淡';
        }
      }
    } else if (weight === -1 || weight === 1) {
      if (time === '今日') {
        if (weight === 1) {
          ret = '看好';
        } else if (weight === -1) {
          ret = '看淡';
        }
      } else {
        ret = '横盘';
      }
    } else if (weight > 4) {
      ret = '大涨';
    } else if (weight > 2) {
      ret = '看涨';
    } else if (weight === 2) {
      ret = '看好';
    } else if (weight === -2) {
      ret = '看淡';
    } else if (weight > -4) {
      ret = '看跌';
    } else {
      ret = '大跌';
    }
    return time + ret;
  }

  /**
   * 行动决策
   * @param {Object} policy 决策参考项
   * @param {Object} presage 预兆
   * @return {String} 返回行动决策
   */
  action(policy, presage) {
    let act = '';
    if (policy.sell === policy.hold && policy.buy === policy.sell) {
      act = '观察';
    } else if (policy.sell >= policy.hold) {
      if (policy.sell > policy.buy) {
        act = '卖出';
      } else if (policy.sell < policy.buy) {
        act = '买入';
      } else {
        // 买卖相等的下
        if (presage.today > 1) {
          act = '留守';
        } else if (presage.today < -1) {
          act = '警惕';
        } else {
          // 如果今日可能横盘，则看近日
          if (presage.recently > 0) {
            act = '留守';
          } else if (presage.recently < 0) {
            act = '警惕';
          } else {
            act = '观察';
          }
        }
      }
    } else if (policy.buy >= policy.hold) {
      if (policy.buy > policy.sell) {
        act = '买入';
      } else if (policy.buy < policy.sell) {
        act = '卖出';
      }
    } else {
      // 买卖相等的下
      if (presage.today > 1) {
        act = '留守';
      } else if (presage.today < -1) {
        act = '警惕';
      } else {
        // 如果今日可能横盘，则看近日
        if (presage.recently > 0) {
          act = '留守';
        } else if (presage.recently < 0) {
          act = '警惕';
        } else {
          act = '观察';
        }
      }
    }
    return act;
  }

  /**
   * 总结归纳
   * @param {Object} ret 执行结果
   * @return {Object} 返回归纳后的结果
   */
  summed(ret) {
    const ar = this.maths.const.DATETIME;
    ret.datetime = ar[ar.length - 1];
    const tip = ' ' + ret.tip + ' ';
    // 建议操作手法
    const policy = {
      buy: 0,
      sell: 0,
      hold: 0,
    };
    // 预言
    const presage = {
      // 近日
      today: 0,
      // 近日
      recently: 0,
      // 之后
      next: 0,
    };

    const lt = this.rules;
    const len = lt.length;
    for (let i = 0; i < len; i++) {
      const o = lt[i];
      if (tip.indexOf(' ' + o.name + ' ') !== -1) {
        if (o.policy === '买') {
          policy.buy++;
        } else if (o.policy === '卖') {
          policy.sell++;
        } else {
          policy.hold++;
        }
        const arr = o.presage.split('，');
        arr.map(val => {
          let key = '';
          if (val.indexOf('今日') !== -1) {
            key = 'today';
          } else if (val.indexOf('近日') !== -1) {
            key = 'recently';
          } else if (val.indexOf('后市') !== -1 || val.indexOf('之后') !== -1) {
            key = 'next';
          }
          if (val.indexOf('大涨') !== -1) {
            presage[key] += 3;
          } else if (val.indexOf('大跌') !== -1) {
            presage[key] -= 3;
          } else if (val.indexOf('涨') !== -1) {
            presage[key] += 2;
          } else if (val.indexOf('跌') !== -1) {
            presage[key] -= 2;
          } else if (val.indexOf('好') !== -1) {
            presage[key] += 1;
          } else if (val.indexOf('淡') !== -1) {
            presage[key] -= 1;
          }
        });
      }
    }
    ret.policy = policy;
    ret.presage = presage;
    let predict = '';
    predict += this.predict('今日', presage.today);
    predict += '，' + this.predict('近日', presage.recently);
    predict += '，' + this.predict('后市', presage.next);
    ret.predict = predict;

    ret.action = this.action(policy, presage);
    return ret;
  }

  run(arr: IKLineItem[]) {
    this.setConst(arr);
    let tip = '';
    let weight = 0;
    const lt = this.rules;
    const len = lt.length;
    for (let i = 0; i < len; i++) {
      const o = lt[i];
      if (o.express) {
        try {
          const bl = this.maths.run_code(o.express);
          if (bl) {
            tip += ' ' + o.name;
            weight += o.weight;
          }
        } catch (e) {
          console.log(e);
        }
      }
    }
    const ret = this.filter({
      tip,
      weight,
    });
    return this.summed(ret);
  }
}