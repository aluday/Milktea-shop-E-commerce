import React, { useState, useContext } from "react";
import {
  Col,
  Row,
  Input,
  Space,
  Flex,
  Popover,
  Badge,
  Divider,
  Menu,
} from "antd";
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
  LogoutOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./shared.css";
import { PRODUCT_TYPES } from "../../services/constants";
import { UserContext } from "../../providers/UserProvider";

const menuItems = PRODUCT_TYPES.map((item) => ({
  label: item.value,
  key: item.type,
}));

export const Header = ({ isAdminPage }) => {
  const navigate = useNavigate();
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [isOpenAdminInfoPopup, setIsOpenAdminInfoPopup] = useState(false);
  const { getCurrentUserData } = useContext(UserContext);
  const currentUser = getCurrentUserData();
  const listOfOrders = JSON.parse(localStorage.getItem("listOfOrders"));

  const handleOnClickCatalog = (e) => {
    switch (e.key) {
      case "home":
        navigate("/");
        break;
    }
  };

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

  const renderHomeCatalog = () => {
    return [
      {
        label: "Trang chủ",
        key: "home",
      },
      {
        label: "Menu",
        key: "menu",
        children: menuItems,
      },
      {
        label: "Liên hệ",
        key: "contact",
      },
    ];
  };

  const handleClickNavigate = (type) => {
    if (type === "profile") {
      navigate("/profile");
    } else if (type === "admin") {
      navigate("/system/admin");
    } else {
      handleLogout();
    }
    setIsOpenPopup(false);
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
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
                  content={content}
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
                <Menu
                  onClick={handleOnClickCatalog}
                  mode="horizontal"
                  items={renderHomeCatalog()}
                />
              </Flex>
            </Col>
            <Col className="gutter-row">
              <Flex align="center" justify="center">
                <Input placeholder="Tìm kiếm..." suffix={<SearchOutlined />} />
              </Flex>
            </Col>
            <Col className="gutter-row">
              <Flex align="center" justify="center">
                {currentUser ? (
                  <WrapperAccountBtnGroup>
                    <Space className="userContainer">
                      <Popover
                        content={content}
                        trigger="click"
                        open={isOpenPopup}
                      >
                        <Flex align="center" justify="center" gap={8}>
                          <UserOutlined
                            onClick={() => setIsOpenPopup((prev) => !prev)}
                          />
                          <span className="accountText">
                            {currentUser.name}
                          </span>
                        </Flex>
                      </Popover>
                    </Space>
                    <Space className="shoppingCartContainer">
                      <Badge
                        count={listOfOrders ? listOfOrders.length : 0}
                        size="small"
                        onClick={() => {
                          if (listOfOrders && listOfOrders.length) {
                            navigate("/payment");
                          }
                        }}
                      >
                        <ShoppingCartOutlined />
                      </Badge>
                      <span className="accountText">Giỏ hàng</span>
                    </Space>
                  </WrapperAccountBtnGroup>
                ) : (
                  <WrapperAccountBtnGroup>
                    <Space className="shoppingCartContainer">
                      <Badge
                        count={listOfOrders ? listOfOrders.length : 0}
                        size="small"
                        onClick={() => {
                          if (listOfOrders && listOfOrders.length) {
                            navigate("/payment");
                          }
                        }}
                      >
                        <ShoppingCartOutlined />
                      </Badge>
                      <span className="accountText">Giỏ hàng</span>
                    </Space>
                    <Space>
                      <LoginOutlined
                        onClick={() => {
                          navigate("/sign-in");
                        }}
                      />
                      <p className="accountText">Đăng nhập</p>
                    </Space>
                    <Space>
                      <UserAddOutlined
                        onClick={() => {
                          navigate("/sign-up");
                        }}
                      />
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
