import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { HomeOutlined, StockOutlined } from '@ant-design/icons';
import { Menu } from 'antd';

const MenuConfig = [
  {
    path: '/index',
    icon: HomeOutlined,
    label: '首页',
  },
  {
    path: '/stock',
    icon: StockOutlined,
    label: '股票',
  },
];

export default () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuList = MenuConfig.map((item) => ({
    key: item.path,
    icon: <item.icon />,
    label: item.label,
    onClick: () => navigate(item.path),
  }));

  return (
    <Menu theme="dark" mode="inline" defaultSelectedKeys={[location.pathname]} items={menuList} />
  );
};
