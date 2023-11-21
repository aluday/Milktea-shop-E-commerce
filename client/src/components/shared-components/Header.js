import React, { useState, useContext } from "react";
import { Col, Row, Input, Space, Tabs, Button, Flex, Popover, Badge, Segmented } from "antd";
import { WrapperHeader, WrapperAccount, WrapperContentPopup } from "./Wrapper";
import logo from "../../assets/cute-bubble-tea-logo.jpg";
import {
  UserOutlined,
  CaretDownOutlined,
  ShoppingCartOutlined,
  SearchOutlined
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./shared.css";
import { UserContext } from '../../providers/UserProvider';

const { Search } = Input;

export const Header = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const content = (
    <div>
      <WrapperContentPopup onClick={() => handleClickNavigate("profile")}>
        Thông tin người dùng
      </WrapperContentPopup>
      {/* {user?.isAdmin && (
        <WrapperContentPopup onClick={() => handleClickNavigate("admin")}>
          Quản lí hệ thống
        </WrapperContentPopup>
      )} */}
      <WrapperContentPopup onClick={() => handleClickNavigate(`my-order`)}>
        Đơn hàng của tôi
      </WrapperContentPopup>
      <WrapperContentPopup onClick={() => handleClickNavigate()}>
        Đăng xuất
      </WrapperContentPopup>
    </div>
  );

  const handleClickNavigate = (type) => {
    if (type === "profile") {
      navigate("/profile");
    } else if (type === "admin") {
      navigate("/system/admin");
    } else if (type === "my-order") {
      // navigate("/my-order", {
      //   state: {
      //     id: user?.id,
      //     token: user?.access_token,
      //   },
      // });
    } else {
      // handleLogout();
    }
    setIsOpenPopup(false);
  };

  return (
    <div className="headerWrapper">
      <Row gutter={{ sm: 8, md: 16, lg: 24 }} align="center" justify="center">
        <Col className="gutter-row" sm={{ span: 2 }} md={{ span: 2 }} lg={{ span: 4 }}>
          <Flex className="logoContainer" align="center" justify="center">
            <img
              className="logo"
              alt="logo"
              src={logo}
              onClick={() => {
                navigate('/');
              }}
            />
          </Flex>
        </Col>
        <Col className="gutter-row" sm={{ span: 4 }} md={{ span: 8 }} lg={{ span: 12 }}>
          <Flex align="center">
            <div className="catalogContainer">
              <Space className="catalogText"><p>Trang chủ</p></Space>
              <Space className="catalogText"><p>Menu</p></Space>
              <Space className="catalogText"><p>Liên hệ</p></Space>
            </div>
          </Flex>
        </Col>
        <Col className="gutter-row" sm={{ span: 2 }} md={{ span: 6 }} lg={{ span: 8 }}>
          <Flex align="center" justify="center">
            <div className="searchContainer">
              <Input placeholder="Tìm kiếm..." suffix={<SearchOutlined />} />
            </div>
            {currentUser ? (
              <>
                <Space className="userContainer">
                  <UserOutlined />
                  <Popover content={content} trigger="click" open={isOpenPopup}>
                    <div onClick={() => setIsOpenPopup((prev) => !prev)}>
                      <span className="accountText">Van Luu</span>
                    </div>
                  </Popover>
                </Space>
                <Space className="shoppingCartContainer">
                  <Badge count="4" size="small">
                    <ShoppingCartOutlined />
                  </Badge>
                  <span className="accountText"> Giỏ hàng </span>
                </Space>
              </>
            ) : (
              <>
                <Space className="accountText"><p>Đăng nhập</p></Space>
                <Space className="accountText"><p>Đăng ký</p></Space>
              </>
            )}
          </Flex>
        </Col>
      </Row>
    </div>
  );
};

export default Header;
