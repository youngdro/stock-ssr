import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  height: 100%;
`;

export const StockContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-row-gap: 16px;
  grid-column-gap: 16px;
  @media screen and (max-width: 1000px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media screen and (max-width: 800px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (max-width: 480px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export const StockHeader = styled.div`
  position: absolute;
  display: flex;
  top: 0;
  left: 0;
  width: 100%;
  padding-bottom: 16px;
  background-color: #fff;
  align-items: center;
  justify-content: space-between;
  z-index: 1;
`;

export const ScrollContainer = styled.div`
  height: 100%;
  padding-bottom: 54px;
  padding-top: 64px;
  overflow: auto;
`;

export const PaginationContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding-top: 16px;
  background-color: #fff;
`;
