import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import Layout from './layout';
import Router from './router';
import Logo from './logo';
import Menu from './menu';
import zhCN from 'antd/locale/zh_CN';

import './index.css';

export default () => {
  return (
    <BrowserRouter>
      <ConfigProvider locale={zhCN}>
        <Layout logo={<Logo />} menu={<Menu />}>
          <Router />
        </Layout>
      </ConfigProvider>
    </BrowserRouter>
  );
};
