import { Spin, Flex } from "antd";
import React from "react";

const Loading = ({ children, isLoading, delay = 100 }) => {
  return (
    <Flex className="loadingContainer" align="center" justify="center">
      <Spin className="loading" spinning={isLoading} delay={delay} size="large">
        {children}
      </Spin>
    </Flex>
  );
};

export default Loading;
