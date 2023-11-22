import React, { useState } from "react";
import { Col, Row, Input, Space, Flex, Popover, Badge, Divider, Menu } from "antd";
import { WrapperContentPopup, WrapperAccountBtnGroup } from "./Wrapper";
import logo from "../../assets/cute-bubble-tea-logo-removebg.png";
import logo1 from "../../assets/logo_1-removebg.png";
import logoText from "../../assets/logo_text-removebg.png";
import {
  UserOutlined,
  ShoppingCartOutlined,
  SearchOutlined,
  MenuOutlined,
  LoginOutlined,
  UserAddOutlined,
  InfoCircleOutlined,
  LogoutOutlined
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./shared.css";

export const Header = ({ isAdminPage, currentUser, homeCatalog, handleOnClickCatalog }) => {
  const navigate = useNavigate();
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [isOpenAdminInfoPopup, setIsOpenAdminInfoPopup] = useState(false);

  const content = (
    <div>
      <WrapperContentPopup onClick={() => handleClickNavigate("profile")}>
        <Flex align="center" gap={8}>
          <InfoCircleOutlined />
          <span>Thông tin người dùng</span>
        </Flex>
      </WrapperContentPopup>
      {currentUser && currentUser.isAdmin && (
        <>
          <WrapperContentPopup onClick={() => handleClickNavigate("admin")}>
            Quản lí hệ thống
          </WrapperContentPopup>
        </>
      )}
      <WrapperContentPopup onClick={() => handleClickNavigate()}>
        <Flex align="center" gap={8}>
          <LogoutOutlined />
          <span>Đăng xuất</span>
        </Flex>
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
            gutter={{ sm: 16, md: 24, lg: 32 }}
            align="center"
            justify="space-between"
          >
            <Col className="gutter-row">
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
            <Col className="gutter-row">
              <Flex align="center" justify="center">
                <Menu onClick={handleOnClickCatalog} mode="horizontal" items={homeCatalog} />
              </Flex>
            </Col>
            <Col className="gutter-row">
              <Flex align="center" justify="center">
                <Input
                  placeholder="Tìm kiếm..."
                  suffix={<SearchOutlined />}
                />
              </Flex>
            </Col>
            <Col className="gutter-row">
              <Flex align="center" justify="center">
                {true ? (
                  <WrapperAccountBtnGroup>
                    <Space className="userContainer">
                      <Popover
                        content={content}
                        trigger="click"
                        open={isOpenPopup}
                      >
                        <Flex align="center" justify="center" gap={8}>
                          <UserOutlined onClick={() => setIsOpenPopup((prev) => !prev)} />
                          <span className="accountText">Van Luu</span>
                        </Flex>
                      </Popover>
                    </Space>
                    <Space className="shoppingCartContainer">
                      <Badge count="4" size="small">
                        <ShoppingCartOutlined />
                      </Badge>
                      <span className="accountText"> Giỏ hàng </span>
                    </Space>
                  </WrapperAccountBtnGroup>
                ) : (
                  <WrapperAccountBtnGroup>
                    <Space>
                      <LoginOutlined />
                      <p className="accountText">Đăng nhập</p>
                    </Space>
                    <Space>
                      <UserAddOutlined />
                      <p className="accountText">Đăng ký</p>
                    </Space>
                  </WrapperAccountBtnGroup>
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
