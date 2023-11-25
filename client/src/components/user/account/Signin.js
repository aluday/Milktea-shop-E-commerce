import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { EyeFilled, EyeInvisibleFilled } from "@ant-design/icons";
import { Flex, Input, Button } from "antd";
import "./Account.css";
import { UserContext } from "../../../providers/UserProvider";
import Header from "../../shared-components/Header";

export const SigninPage = () => {
  const navigate = useNavigate();
  const { username, setUsername, password, setPassword, handleSignin } =
    useContext(UserContext);

  return (
    <>
      <Header />
      <Flex className="accountContainer" align="center" justify="center">
        <div className="signinForm">
          <h2 className="signinText">ĐĂNG NHẬP</h2>
          <Flex vertical justify="center" gap={16}>
            <Input
              className="usernameField"
              placeholder="Tên đăng nhập"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <Input.Password
              placeholder="Mật khẩu"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              iconRender={(visible) =>
                visible ? <EyeFilled /> : <EyeInvisibleFilled />
              }
            />
            <Button
              type="primary"
              className="signinBtn"
              disabled={!username || !password}
              onClick={() => {
                handleSignin();
                navigate("/");
              }}
            >
              ĐĂNG NHẬP
            </Button>
          </Flex>
          <Flex justify="space-between">
            <p
              onClick={() => {
                navigate("/sign-up");
              }}
              className="text-link"
            >
              Tạo tài khoản?
            </p>
          </Flex>
        </div>
      </Flex>
    </>
  );
};

export default SigninPage;
