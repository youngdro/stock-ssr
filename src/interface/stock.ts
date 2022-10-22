export interface IStockItem {
  symbol: string;
  code: string;
  name: string;
}

// 个股归属板块
export interface IStockBoard {
  code: string;
  name: string;
}

// 股票指标
export interface IShareIndex {
  date: string;
  Diluted_EPS: string; // 摊薄每股收益
  EPSWA: string; // 加权每股收益
  AEPS: string; // 每股收益_调整后
  EPS_NGOL: string; // 扣除非经常性损益后的每股收益
  BPS: string; // 每股净资产_调整前
  BPS_Adjusted: string; // 每股净资产_调整后
  OCFPS: string; // 每股经营性现金流
  CRPS: string; // 每股资本公积金
  UDPPS: string; // 每股未分配利润
}

// 盈利能力
export interface IProfitability {
  Date: string;
  OROA: string; // 总资产利润率
  OPE: string; // 主营业务利润率
  PROA: string; // 总资产净利润率
  ROPTC: string; // 成本费用利润率
  OPR: string; // 营业利润率
  COGSTS: string; // 主营业务成本率
  PMOS: string; // 销售净利率
  DOE: string; // 股本报酬率
  ROC: string; // 净资产报酬率
  ROA: string; // 资产报酬率
  SGPR: string; // 销售毛利率
  POTE: string; // 三项费用比重
  NMP: string; // 非主营比重
  POMP: string; // 主营利润比重
  RR: string; // 股息发放率
  ROI: string; // 投资收益率
  GP: string; // 主营业务利润(元)
  ROE: string; // 净资产收益率
  ROEWA: string; // 加权净资产收益率
  NPAD: string; // 扣除非经常性损益后的净利润
}

// 成长能力
export interface IGrowthAbility {
  Date: string;
  MBRG: string; // 主营业务收入增长率
  NPGR: string; // 净利润增长率
  GRNA: string; // 净资产增长率
  GRTA: string; // 总资产增长率
}

// 营运能力
export interface IOperationAbility {
  Date: string;
  ART: string; // 应收账款周转率(次)
  DSO: string; // 应收账款周转天数
  DSI: string; // 存货周转天数
  RST: string; // 存货周转率(次)
  TFA: string; // 固定资产周转率(次)
  TATO: string; // 总资产周转率(次)
  TATD: string; // 总资产周转天数(天)
  CATA: string; // 流动资产周转率(次)
  DCAT: string; // 流动资产周转天数(天)
}

// 偿债及资本结构
export interface IDebtDecapitalStructure {
  Date: string;
  AR: string; // 流动比率
  QR: string; // 速动比率
  CR: string; // 现金比率(%)
  ICR: string; // 利息支付倍数
  LDWCR: string; // 长期债务与营运资金比率(%)
  EAR: string; // 股东权益比率(%)
  LDR: string; // 长期负债比率(%)
  REFA: string; // 股东权益与固定资产比率(%)
  DER: string; // 负债与所有者权益比率(%)
  RLALF: string; // 长期资产与长期资金比率(%)
  MCR: string; // 资本化比率(%)
  FANWR: string; // 固定资产净值率(%)
  CIR: string; // 资本固定化比率(%)
  ER: string; // 产权比率(%)
  LVR: string; // 清算价值比率(%)
  POFA: string; // 固定资产比重(%)
  LEV: string; // 资产负债率(%)
  ASSET: string; // 总资产(元)
}

// 现金流量
export interface ICashFlow {
  Date: string;
  NOCFTSR: string; // 经营现金净流量对销售收入比率(%)
  ROOCFOA: string; // 资产的经营现金流量回报率(%)
  NOCFTNP: string; // 经营现金净流量与净利润的比率(%)
  NOCFTDR: string; // 经营现金净流量对负债比率(%)
  CFR: string; // 现金流量比率(%)
}

// 财务指标
export interface IGuideLineData {
  share_index: IShareIndex[];
  profitability: IProfitability[];
  growth_ability: IGrowthAbility[];
  operation_ability: IOperationAbility[];
  debt_decapital_structure: IDebtDecapitalStructure[];
  cash_flow: ICashFlow[];
}

export interface IKLineItem {
  date: string; // 交易日期
  open: string; // 开盘价
  close: string; // 收盘价
  high: string; // 最高价
  low: string; // 最低价
  volume: string; // 成交量
  amount: string; // 成交额
  swing: string; // 振幅
}

export interface IMin {
  date: string; // 交易时间
  price: string; // 分时价格（分钟线收盘价）
  volume: string; // 分时成交量
}

export interface ITrendItem {
  date: string; // 交易日期
  trade: string; // 收盘价
  changeratio: string; // 涨跌幅
  turnover: string; // 换手率
  netamount: string; // 净流入/万
  ratioamount: string; // 净流入率
  r0_net: string; // 主力净流入/万
  r0_ratio: string; // 主力净流入率
  r0x_ratio: string; // 主力罗盘
  cate_ra: string; // 行业净流入率
  cate_na: string; // 行业净流入/万
}
