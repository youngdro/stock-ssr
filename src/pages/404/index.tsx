import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Result, Button } from 'antd';

export default () => {
  const navigate = useNavigate();
  return (
    <Result
      status="404"
      title="404"
      subTitle="页面不存在"
      extra={
        <Button type="primary" onClick={() => navigate('/')}>
          Back Home
        </Button>
      }
    />
  );
};
