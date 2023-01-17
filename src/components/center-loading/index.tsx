import React from "react";
import { Spin } from "antd";

export default (props) => {
  return (
    <Spin
      spinning={true}
      size="large"
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translateX(-50%) translateY(-50%)",
      }}
    >
      {props.children}
    </Spin>
  );
};
