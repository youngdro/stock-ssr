import React, { useEffect, useState } from "react";
import { Pagination } from 'antd';
import { Container, StockContainer, StockHeader, ScrollContainer, PaginationContainer } from './styled';
import StockCard from '../../components/stock-card';
import CenterLoading from "../../components/center-loading";
import StockFilter from "../../components/stock-filter";
import StockSorter from "../../components/stock-sorter";
import usePagination from '../../hooks/usePagination';
import { useGetCurrentAllStock } from '../../hooks/useStockDataSource';
import { ICurrentStock } from '../../api/stock/tools/interface';
import { UseSortProps, UseFilterProps } from '../../hooks/interface';


export default () => {
  const [searchValue, setSearchValue] = useState('');
  const [sorterProps, setSorterProps] = useState<Omit<UseSortProps<ICurrentStock>, 'list'>>({ sortKey: 'pctChg', order: 'desc' })
  // const [filterProps, setFilterProps] = useState<Omit<UseFilterProps<ICurrentStock>, 'list'>>({ searchValue: '' })
  const { current, pageSize, onChange: onPageChange } = usePagination({ defaultPageSize: 30 });
  const { stockList, pageStockList, loading } = useGetCurrentAllStock({
    sorterProps,
    pagination: { current, pageSize },
    filterProps: { searchValue, searchKeys: ['code', 'name']},
  });

  useEffect(() => {
  }, [])

  const onSearch = (val) => {
    setSearchValue(val);
    onPageChange(1, pageSize);
  };

  const onSort = (options) => {
    setSorterProps(options)
  };

  return (
    <Container>
      <StockHeader>
        <StockFilter onSearch={onSearch} />
        <StockSorter onSort={onSort} />
      </StockHeader>
      <ScrollContainer>
        <StockContainer>
          {loading && <CenterLoading />}
          {pageStockList.map((item, index) => <StockCard stock={item} index={index} key={index} />)}
        </StockContainer>
      </ScrollContainer>
      <PaginationContainer>
        <Pagination
          showSizeChanger
          showQuickJumper
          showTotal={(total) => `共 ${total}`}
          current={current}
          pageSize={pageSize}
          onChange={onPageChange}
          total={stockList.length}
        />
      </PaginationContainer>
    </Container>
  );
};