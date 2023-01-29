import React, { useState } from 'react';
// import {
// MenuFoldOutlined,
// MenuUnfoldOutlined,
// } from '@ant-design/icons';
import { Layout, theme } from 'antd';

const { Header, Sider, Content } = Layout;

export default (props) => {
  const { logo = null, menu = null } = props;
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        breakpoint="lg"
        onCollapse={(val) => {
          setCollapsed(val);
        }}
      >
        {logo}
        {menu}
      </Sider>
      <Layout className="site-layout">
        {/* <Header style={{ padding: 0, background: colorBgContainer }}>
                {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                    className: 'trigger',
                    onClick: () => setCollapsed(!collapsed),
                })}
                </Header> */}
        <Content
          style={{
            padding: 24,
            position: 'relative',
            minHeight: 280,
            // maxHeight: 'calc(100vh - 64px)',
            maxHeight: '100vh',
            overflow: 'auto',
            background: colorBgContainer,
          }}
        >
          {props.children}
        </Content>
      </Layout>
    </Layout>
  );
};
