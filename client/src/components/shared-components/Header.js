import React, { useEffect, useState } from "react";
import { Badge, Col, Popover } from "antd";
import { WrapperHeader, WrapperAccount, WrapperContentPopup } from "./Wrapper";
import logo from "../../assets/logo.png";
import {
  UserOutlined,
  CaretDownOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import Loading from "./Loading";
import SearchBar from "./SearchBar";
import { useNavigate } from "react-router-dom";
import "./shared.css";

export const Header = ({ isHiddenSearch = false, isHiddenCart = false }) => {
  const navigate = useNavigate();

  // const [userName, setUserName] = useState("");
  // const [search, setSearch] = useState("");
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
      navigate("/profile-user");
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
      <WrapperHeader
        gutter={30}
        style={{
          justifyContent:
            isHiddenSearch && isHiddenSearch ? "space-between" : "unset",
        }}
      >
        <Col span={5}>
          <img
            alt="logo"
            width="130px"
            height="40px"
            src={logo}
            onClick={() => {
              navigate('/');
            }}
          />
        </Col>
        {!isHiddenSearch && (
          <Col span={13}>
            <SearchBar
              size="large"
              textbutton="Tìm kiếm"
              placeholder="Tìm sản phẩm"
              onChange={() => {}}
            />
          </Col>
        )}
        <Col
          span={6}
          style={{ display: `flex`, gap: "54px", paddingTop: "6px" }}
        >
          <Loading isLoading={isLoading}>
            <WrapperAccount>
              <UserOutlined style={{ fontSize: `30px` }} />
              <Popover content={content} trigger="click" open={isOpenPopup}>
                <div
                  style={{
                    cursor: "pointer",
                    maxWidth: 100,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                  onClick={() => setIsOpenPopup((prev) => !prev)}
                >
                  {/* {userName?.length ? userName : user?.email} */}
                  {/* {user.name} */}
                  Van Luu
                </div>
              </Popover>
            </WrapperAccount>
          </Loading>
          {!isHiddenCart && (
            <div style={{ cursor: "pointer" }}>
              <Badge
                // count={order?.orderItems?.length}
                count="4"
                size="small"
              >
                <ShoppingCartOutlined
                  style={{ fontSize: "30px", color: `#8B7D6B` }}
                />
              </Badge>
              {/* <ShoppingCartOutlined style={{ fontSize: `30px` }} /> */}
              <span style={{ fontSize: `12px`, color: `#8B7D6B` }}>
                Giỏ hàng
              </span>
            </div>
          )}
        </Col>
      </WrapperHeader>
    </div>
  );
};

export default Header;
