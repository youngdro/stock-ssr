import React, { useEffect, useState } from "react";
import { Pagination, Input, Button } from 'antd';
import { ICurrentStock } from '../../api/stock/tools/interface';
import { Container, StockContainer, ScrollContainer, SearchContainer, PaginationContainer } from './styled';
import {
  getCurrentAllStock, getLatestDailyHis,
  updateAllLatestDailyHis, updateAllLatestWeekHis, updateAllLatestMonthHis,
  getDailyHis, getWeekHis, getMonthHis,
} from '../../api/stock';
import StockCard from '../../components/stock-card';
import usePagination from '../../hooks/usePagination';
import { useGetCurrentAllStock } from '../../hooks/useStockDataSource';

export default () => {
  const [searchValue, setSearchValue] = useState('');
  const { current, pageSize, onChange } = usePagination({ defaultPageSize: 30 });
  const { stockList, pageStockList } = useGetCurrentAllStock({
    filter: { searchValue },
    pagination: { current, pageSize },
    sort: { byPctChg: 'desc' }
  });
  // const { data: stockList = [], loading } = useRequest(() => getCurrentAllStock());
  // const filteredStockList = stockList.filter((item) => {
  //   return item.code.indexOf('bj') === -1 ? (searchValue ? (item.code.indexOf(searchValue) > -1 || item.name.indexOf(searchValue) > -1) : true) : false;
  // });
  // const list = filteredStockList.slice(current - 1, current + pageSize - 1);

  useEffect(() => {
  }, [])

  const onSearch = (val) => {
    console.log('')
    setSearchValue(val);
  }

  const _getCurrentAllStock = () => {
    getCurrentAllStock();
  };

  const _getLatestDailyHis = () => {
    getLatestDailyHis({ params: { code: 'sz.300769' }});
  };

  const renderStockCard = (item: ICurrentStock, index: number) => {
    return <StockCard stock={item} index={index} key={index} />
  };

  return (
    <Container>
      <SearchContainer>
        <Input.Search
          allowClear
          enterButton="搜索"
          size="large"
          onSearch={onSearch}
          style={{ width: '38.2%' }}
        />
        {/* <Button onClick={() => { updateAllLatestDailyHis() }}>拉取最近一年所有【日】K线</Button> */}
      </SearchContainer>
      <ScrollContainer>
        <StockContainer>
          {pageStockList.map((item, i) => renderStockCard(item, i))}
        </StockContainer>
      </ScrollContainer>
      
      {/* <Button onClick={_getCurrentAllStock}>getCurrentAllStock</Button>
      <Button onClick={_getLatestDailyHis}>getLatestDailyHis</Button>
      <Button onClick={() => { updateAllLatestDailyHis() }}>拉取最近一年所有【日】K线</Button>
      <Button onClick={() => { updateAllLatestWeekHis() }}>拉取最近一年所有【周】K线</Button>
      <Button onClick={() => { updateAllLatestMonthHis() }}>拉取最近3年所有【月】K线</Button>
      <Button onClick={() => {
        getDailyHis({ query: { code: 'sz.300769', startDate: '2022-10-20', endDate: '2023-01-11' } })}}
      >getDailyHis</Button>
      <Button onClick={() => {
        getWeekHis({ query: { code: 'sz.300769', startDate: '2022-08-20', endDate: '2023-01-11' } })}}
      >getWeekHis</Button>
      <Button onClick={() => {
        getMonthHis({ query: { code: 'sz.300769', startDate: '2022-08-20', endDate: '2022-12-25' } })}}
      >getMonthHis</Button> */}
      <PaginationContainer>
        <Pagination
          showSizeChanger
          showQuickJumper
          showTotal={(total) => `共 ${total}`}
          current={current}
          pageSize={pageSize}
          onChange={onChange}
          total={stockList.length}
        />
      </PaginationContainer>
    </Container>
  );
};