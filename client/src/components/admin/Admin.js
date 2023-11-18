import React, { useState } from "react";
import { Menu } from "antd";
import {
  UserOutlined,
  AppstoreOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { getItem } from "../../services/common";
import Header from "../shared-components/Header";
import { UserManagement } from "./user-management/UserManagement";
import { Product } from "./product/Product";
import { Orders } from "./orders/Orders";
import "./Admin.css";

export const AdminPage = () => {
  const items = [
    getItem("Người dùng", "users", <UserOutlined />),
    getItem("Sản phẩm", "products", <AppstoreOutlined />),
    getItem("Đơn hàng", "orders", <ShoppingCartOutlined />),
  ];
  const [keySelected, setKeySelected] = useState("");

  const renderPage = (key) => {
    switch (key) {
      case "users":
        return <UserManagement />;
      case "products":
        return <Product />;
      case "orders":
        return <Orders />;
      default:
        return <></>;
    }
  };

  const handleOnCLick = ({ key }) => {
    setKeySelected(key);
  };

  return (
    <>
      <Header isHiddenSearch isHiddenCart />
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
