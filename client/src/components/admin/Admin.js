import React, { useState } from "react";
import { Menu } from "antd";
import {
  IdcardOutlined,
  RestOutlined,
  ShoppingOutlined,
  // DashboardOutlined,
  AppstoreAddOutlined,
} from "@ant-design/icons";
import { getItem } from "../../services/common";
import Header from "../shared-components/Header";
import { UserManagement } from "./user-management/UserManagement";
import { Product } from "./product/Product";
import { Orders } from "./orders/Orders";
import { ProductType } from "./product-type/ProductType";
// import { Dashboard } from './dashboard/Dashboard';
import "./Admin.css";
import {
  getAllProductTypes,
  handleError,
} from "../../services/endpoint-services";
import * as messages from "../../services/messages";
import Loading from "../shared-components/Loading";
// import mockData from "../../mockData.json";

// const productTypes = mockData.types.map((item, index) => ({
//   _id: item._id,
//   columnNo: index + 1,
//   typeName: item.type_name,
// }));

export const AdminPage = () => {
  const [keySelected, setKeySelected] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const items = [
    // getItem("Dashboard", "dashboard", <DashboardOutlined />),
    getItem("Loại sản phẩm", "type", <AppstoreAddOutlined />),
    getItem("Sản phẩm", "products", <RestOutlined />),
    getItem("Đơn hàng", "orders", <ShoppingOutlined />),
    getItem("Người dùng", "users", <IdcardOutlined />),
  ];

  const renderPage = (key) => {
    switch (key) {
      case "users":
        return <UserManagement />;
      // case "type":
      //   return <ProductType />
      case "products":
        return <Product />;
      case "orders":
        return <Orders />;
      default:
        // return <Dashboard />;
        return <ProductType />;
    }
  };

  const handleOnCLick = ({ key }) => {
    if (key === "products") {
      setIsLoading(true);
      getAllProductTypes()
        .then((res) => {
          if (res && res.status && res.data.length > 0) {
            setKeySelected(key);
            setIsLoading(false);
          } else {
            messages.warning(
              "Bạn không được phép truy cập vào trang Quản lý sản phẩm!",
              "Yêu cầu: Phải có ít nhất một mã loại sản phẩm. Bạn vui lòng nhập mã loại sản phẩm trước khi quay lại trang này."
            );
            setIsLoading(false);
          }
        })
        .catch((err) => {
          handleError(err);
          setIsLoading(false);
        });
    } else {
      setKeySelected(key);
    }
  };

  return (
    <>
      <Loading isLoading={isLoading} />
      <Header isAdminPage />
      <div className="adminMenuContainer">
        <Menu
          className="adminMenu"
          mode="inline"
          items={items}
          onClick={handleOnCLick}
          selectedKeys={[keySelected]}
        />
        <div className="adminMenuContent">{renderPage(keySelected)}</div>
      </div>
    </>
  );
};

export default AdminPage;
