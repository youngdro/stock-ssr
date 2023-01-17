import React, { useState } from "react";
import { Tabs, Spin } from "antd";
import type { TabsProps } from "antd";
import { Container } from "./styled";
import {
  useGetLatestDailyHis,
  useGetLatestWeekHis,
  useGetLatestMonthHis,
} from "../../hooks/useStockDataSource";
import StockKLine from "../stock-kline";

interface StockDetailProps {
  code: string;
}

const StockDetail: React.FC<StockDetailProps> = ({ code }) => {
  const [tabKey, setTabKey] = useState("d");
  const [tabKeyVisitedMap, setTabKeyVisitedMap] = useState({});
  const { data: latestDailyHis, loading: dailyLoading } = useGetLatestDailyHis(code);
  const { data: latestWeekHis, loading: weekLoading } = useGetLatestWeekHis(
    code,
    { ready: !!tabKeyVisitedMap["w"] }
  );
  const { data: latestMonthHis, loading: monthLoading } = useGetLatestMonthHis(
    code,
    { ready: !!tabKeyVisitedMap["m"] }
  );

  const onTabChange = (val: string) => {
    setTabKey(val);
    setTabKeyVisitedMap({ ...tabKeyVisitedMap, [val]: true });
  };

  const renderKLineChart = (data) => {
    return <StockKLine data={data} />;
  };

  const items: TabsProps["items"] = [
    {
      key: "d",
      label: `日K线`,
      forceRender: true,
      children: (
        <Spin spinning={dailyLoading}>{renderKLineChart(latestDailyHis)}</Spin>
      ),
    },
    {
      key: "w",
      label: `周K线`,
      forceRender: true,
      children: (
        <Spin spinning={weekLoading}>{renderKLineChart(latestWeekHis)}</Spin>
      ),
    },
    {
      key: "m",
      label: `月K线`,
      forceRender: true,
      children: (
        <Spin spinning={monthLoading}>{renderKLineChart(latestMonthHis)}</Spin>
      ),
    },
  ];

  return (
    <Container>
      <Tabs activeKey={tabKey} items={items} onChange={onTabChange} />
    </Container>
  );
};

export default StockDetail;
