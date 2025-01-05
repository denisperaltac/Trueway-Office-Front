import React from "react";
import { Flex, Spin } from "antd";

export const Loading: React.FC = () => (
  <Flex
    style={{
      height: "100vh",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
    }}
    gap="middle"
    vertical
  >
    <Spin size="large" />
  </Flex>
);
