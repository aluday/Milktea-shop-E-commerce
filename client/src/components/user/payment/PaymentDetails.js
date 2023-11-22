import React, { useContext } from "react";
import { UserContext } from "../../../providers/UserProvider";
import Header from "../../shared-components/Header";
import { Flex, Row, Col, Avatar, Space, List } from "antd";
import { UserOutlined } from "@ant-design/icons";

export const PaymentDetails = () => {
  const { currentUser } = useContext(UserContext);

  return (
    <div>
      <Header currentUser={currentUser} />
      <h1>Thanh toán</h1>
    </div>
  );
};

export default PaymentDetails;
