import React, { useState } from "react";
import { Col, Row, Input, Space, Flex, Popover, Badge, Divider } from "antd";
import { WrapperContentPopup } from "./Wrapper";
import logo from "../../assets/cute-bubble-tea-logo-removebg.png";
import logo1 from "../../assets/logo_1-removebg.png";
import logoText from "../../assets/logo_text-removebg.png";
import {
  UserOutlined,
  ShoppingCartOutlined,
  SearchOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./shared.css";

export const Header = ({ isAdminPage, currentUser }) => {
  const navigate = useNavigate();
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [isOpenAdminInfoPopup, setIsOpenAdminInfoPopup] = useState(false);

  const content = (
    <div>
      <WrapperContentPopup onClick={() => handleClickNavigate("profile")}>
        Thông tin người dùng
      </WrapperContentPopup>
      <Divider />
      {currentUser && currentUser.isAdmin && (
        <>
          <WrapperContentPopup onClick={() => handleClickNavigate("admin")}>
            Quản lí hệ thống
          </WrapperContentPopup>
          <Divider />
        </>
      )}
      <WrapperContentPopup onClick={() => handleClickNavigate(`my-order`)}>
        Đơn hàng của tôi
      </WrapperContentPopup>
      <Divider />
      <WrapperContentPopup onClick={() => handleClickNavigate()}>
        Đăng xuất
      </WrapperContentPopup>
    </div>
  );

  const renderAdminInfo = () => {
    return (
      <div className="adminInfoContainer">
        <p>Trang cá nhân</p>
        <Divider />
        <p>Đăng xuất</p>
      </div>
    );
  };

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
    <>
      {isAdminPage ? (
        <div className="adminHeaderWrapper">
          <Flex className="logoContainer" align="center" justify="center">
            <img
              className="logo"
              alt="logo"
              src={logo1}
              onClick={() => {
                navigate("/");
              }}
            />
            <img
              className="logoText"
              alt="Bubble Tea"
              src={logoText}
              onClick={() => {
                navigate("/");
              }}
            />
          </Flex>
          <div className="btnGroup">
            <Flex align="center" justify="space-between">
              <Space>
                <MenuOutlined />
              </Space>
              <Space>
                <Popover
                  content={renderAdminInfo}
                  trigger="click"
                  open={isOpenAdminInfoPopup}
                  placement="bottomLeft"
                >
                  <UserOutlined
                    onClick={() => {
                      setIsOpenAdminInfoPopup((prev) => !prev);
                    }}
                  />
                </Popover>
              </Space>
            </Flex>
          </div>
        </div>
      ) : (
        <div className="headerWrapper">
          <Row
            gutter={{ sm: 8, md: 16, lg: 24 }}
            align="center"
            justify="center"
          >
            <Col
              className="gutter-row"
              sm={{ span: 2 }}
              md={{ span: 2 }}
              lg={{ span: 4 }}
            >
              <Flex className="logoContainer" align="center" justify="center">
                <img
                  className="logo"
                  alt="logo"
                  src={logo}
                  onClick={() => {
                    navigate("/");
                  }}
                />
              </Flex>
            </Col>
            <Col
              className="gutter-row"
              sm={{ span: 4 }}
              md={{ span: 8 }}
              lg={{ span: 12 }}
            >
              <Flex align="center">
                <div className="catalogContainer">
                  <Space className="catalogText">
                    <p>Trang chủ</p>
                  </Space>
                  <Space className="catalogText">
                    <p>Menu</p>
                  </Space>
                  <Space className="catalogText">
                    <p>Liên hệ</p>
                  </Space>
                </div>
              </Flex>
            </Col>
            <Col
              className="gutter-row"
              sm={{ span: 2 }}
              md={{ span: 6 }}
              lg={{ span: 8 }}
            >
              <Flex align="center" justify="center">
                <div className="searchContainer">
                  <Input
                    placeholder="Tìm kiếm..."
                    suffix={<SearchOutlined />}
                  />
                </div>
                {currentUser ? (
                  <>
                    <Space className="userContainer">
                      <UserOutlined />
                      <Popover
                        content={content}
                        trigger="click"
                        open={isOpenPopup}
                      >
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
                    <Space className="accountText">
                      <p>Đăng nhập</p>
                    </Space>
                    <Space className="accountText">
                      <p>Đăng ký</p>
                    </Space>
                  </>
                )}
              </Flex>
            </Col>
          </Row>
        </div>
      )}
    </>
  );
};

export default Header;
