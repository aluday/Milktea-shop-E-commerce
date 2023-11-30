import React, { useState, useEffect } from "react";
import TableComponent from "../../shared-components/Table";
import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Form } from "antd";
import {
  getAllOrders,
  handleError,
} from "../../../services/endpoint-services";
import * as messages from "../../../services/messages";
import ModalComponent from "../../shared-components/Modal";

export const Orders = () => {
  // const displayedColumns = [
  //   {
  //     title: "#",
  //     dataIndex: "columnNo",
  //   },
  //   {
  //     title: "Mã đơn hàng",
  //     dataIndex: "orderNo",
  //   },
  //   {
  //     title: "Khách hàng",
  //     dataIndex: "user",
  //   }
  // ];
  
  return <div>
    <h2>Quản lý đơn hàng</h2>
  </div>;
};

export default Orders;
