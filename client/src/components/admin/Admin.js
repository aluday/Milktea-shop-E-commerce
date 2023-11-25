import React, { useState } from "react";
import { Menu, Flex } from "antd";
import {
  IdcardOutlined,
  RestOutlined,
  ShoppingOutlined,
  DashboardOutlined,
  AppstoreAddOutlined
} from "@ant-design/icons";
import { getItem } from "../../services/common";
import Header from "../shared-components/Header";
import { UserManagement } from "./user-management/UserManagement";
import { Product } from "./product/Product";
import { Orders } from "./orders/Orders";
import { ProductType } from './product-type/ProductType';
import { Dashboard } from './dashboard/Dashboard';
import "./Admin.css";

export const AdminPage = () => {
  const [keySelected, setKeySelected] = useState("");

  const items = [
    getItem("Dashboard", "dashboard", <DashboardOutlined />),
    getItem("Loại sản phẩm", "type", <AppstoreAddOutlined />),
    getItem("Sản phẩm", "products", <RestOutlined />),
    getItem("Đơn hàng", "orders", <ShoppingOutlined />),
    getItem("Người dùng", "users", <IdcardOutlined />),
  ];

  const renderPage = (key) => {
    switch (key) {
      case "users":
        return <UserManagement />;
      case "type": 
        return <ProductType />
      case "products":
        return <Product />;
      case "orders":
        return <Orders />;
      default:
        return <Dashboard />;
    }
  };

  const handleOnCLick = ({ key }) => {
    setKeySelected(key);
  };

  return (
    <>
      <Header isAdminPage />
      <div className="adminMenuContainer">
        <Menu
          className="adminMenu"
          mode="inline"
          items={items}
          onClick={handleOnCLick}
        />
        <div className="adminMenuContent">{renderPage(keySelected)}</div>
      </div>
    </>
  );
};

export default AdminPage;
